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
      getResponse: (widgetId?: string) => string | undefined;
    };
  }
}

function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();

  const existing = document.getElementById(SCRIPT_ID);
  if (existing) {
    return new Promise((resolve) => {
      existing.addEventListener("load", () => resolve(), { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Turnstile script failed to load"));
    document.head.appendChild(script);
  });
}

export const TurnstileWidget = forwardRef<TurnstileWidgetHandle, TurnstileWidgetProps>(
  function TurnstileWidget({ siteKey, onReady, onError }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const tokenRef = useRef<string | null>(null);

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
      const container = containerRef.current;
      if (!container || !siteKey) return;

      loadTurnstileScript()
        .then(() => {
          if (cancelled || !window.turnstile || !containerRef.current) return;
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            theme: "dark",
            callback: (token) => {
              tokenRef.current = token;
              onReady?.();
            },
            "error-callback": () => {
              tokenRef.current = null;
              onError?.();
            },
            "expired-callback": () => {
              tokenRef.current = null;
            },
          });
        })
        .catch(() => onError?.());

      return () => {
        cancelled = true;
      };
    }, [siteKey, onReady, onError]);

    return <div ref={containerRef} className="min-h-[65px]" aria-label="Security verification" />;
  },
);
