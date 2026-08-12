import type { NextConfig } from "next";

/*
 * Note: builds warn that the workspace root was inferred as the parent
 * directory, because a stray package-lock.json sits in /Users/azura. The
 * documented fix is `turbopack.root`, but setting it here made the dev server
 * resolve `tailwindcss` from that parent directory and fail. Deleting the stray
 * lockfile is the real fix; the warning is harmless until then.
 */
const nextConfig: NextConfig = {
  images: {
    /*
     * The source art in public/ is PNG, much of it 1.6-2.3MB apiece. AVIF is
     * roughly 20% smaller than WebP on this kind of photography, at the cost of
     * a slower first encode; WebP is the fallback for browsers without AVIF.
     * Order matters — the first entry the Accept header matches is the one
     * served.
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
