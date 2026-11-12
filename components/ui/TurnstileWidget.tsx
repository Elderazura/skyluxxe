"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from "react";

const SCRIPT_ID = "cf-turnstile-script";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileWidgetProps = {
  siteKey: string;
  onReady?: () => void;
  onError?: () => void;
};

export type TurnstileWidgetHandle = {
  getToken: () => string | null;
  reset: () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string | undefined;
    };
  }
}

let scriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    document.getElementById(SCRIPT_ID)?.remove();
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      // Allow a later mount to try again instead of caching the failure.
      scriptPromise = null;
      script.remove();
      reject(new Error("Turnstile script failed to load"));
    };
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export const TurnstileWidget = forwardRef<TurnstileWidgetHandle, TurnstileWidgetProps>(
  function TurnstileWidget({ siteKey, onReady, onError }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const tokenRef = useRef<string | null>(null);

    /*
     * Callbacks live in refs so a parent re-render (which hands us new inline
     * arrows) does not re-run the effect and render a second widget into the
     * same container.
     */
    const onReadyRef = useRef(onReady);
    const onErrorRef = useRef(onError);
    useEffect(() => {
      onReadyRef.current = onReady;
      onErrorRef.current = onError;
    });

    const reset = useCallback(() => {
      tokenRef.current = null;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        getToken: () => tokenRef.current,
        reset,
      }),
      [reset],
    );

    useEffect(() => {
      let cancelled = false;
      if (!containerRef.current || !siteKey) return;

      loadTurnstileScript()
        .then(() => {
          if (cancelled || !window.turnstile || !containerRef.current) return;
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            theme: "dark",
            callback: (token) => {
              tokenRef.current = token;
              onReadyRef.current?.();
            },
            "error-callback": () => {
              tokenRef.current = null;
              onErrorRef.current?.();
            },
            "expired-callback": () => {
              tokenRef.current = null;
            },
          });
        })
        .catch(() => {
          if (!cancelled) onErrorRef.current?.();
        });

      return () => {
        cancelled = true;
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch {
            /* widget already gone */
          }
        }
        widgetIdRef.current = null;
        tokenRef.current = null;
      };
    }, [siteKey]);

    return <div ref={containerRef} className="min-h-[65px]" />;
  },
);
