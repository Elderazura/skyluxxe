import type { NextConfig } from "next";

/*
 * Content-Security-Policy. Next's own bootstrap is inline, so script-src needs
 * 'unsafe-inline' unless nonces are threaded through every request (which
 * would make every page dynamic). The third parties are the two the site
 * actually uses: Cloudflare Turnstile on the enquiry form and the optional
 * Google map. blob:/data: cover three.js textures and the GLB loader, and
 * 'wasm-unsafe-eval' lets the 3D model's mesh decoder (WebAssembly) compile —
 * it permits WebAssembly only, not eval().
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "media-src 'self'",
  "connect-src 'self' blob: data: https://challenges.cloudflare.com",
  "worker-src 'self' blob:",
  "frame-src https://challenges.cloudflare.com https://maps.google.com https://www.google.com",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

/*
 * Note: builds warn that the workspace root was inferred as the parent
 * directory, because a stray package-lock.json sits in /Users/azura. The
 * documented fix is `turbopack.root`, but setting it here made the dev server
 * resolve `tailwindcss` from that parent directory and fail. Deleting the stray
 * lockfile is the real fix; the warning is harmless until then.
 */
const nextConfig: NextConfig = {
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  images: {
    /*
     * AVIF is roughly 20% smaller than WebP on this kind of photography, at the
     * cost of a slower first encode; WebP is the fallback for browsers without
     * AVIF. Order matters — the first entry the Accept header matches is the
     * one served.
     */
    formats: ["image/avif", "image/webp"],

    /*
     * Required from Next 16 on: only qualities on this list may be requested.
     * Nothing in the app passes a `quality` prop, so this is the default (75)
     * plus one lower step for any future use on large decorative art.
     */
    qualities: [50, 75],

    /* These are static brand assets that only change on redeploy. */
    minimumCacheTTL: 60 * 60 * 24 * 31,
  },
};

export default nextConfig;
