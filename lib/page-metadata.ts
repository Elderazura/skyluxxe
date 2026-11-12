import type { Metadata } from "next";

const SITE_NAME = "Skyluxxe Concierge Travel";

/*
 * Served from app/opengraph-image.jpg. It has to be named here as well: a page
 * that sets its own `openGraph` block replaces the layout's wholesale, share
 * image included.
 */
const SHARE_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Skyluxxe Concierge Travel — The Art of Invisible Service",
};

type PageMetadataInput = {
  /** Route path, e.g. "/about". Becomes the canonical URL and og:url. */
  path: string;
  title: string;
  description: string;
  /** Set false for pages that should stay out of search results. */
  index?: boolean;
};

/**
 * Per-page metadata. Each page needs its own canonical and Open Graph block:
 * Next merges metadata shallowly, so anything left to the root layout is
 * inherited verbatim — which is how every page once declared the home page as
 * its canonical URL and shared the home page's og:title and og:url.
 */
export function pageMetadata({
  path,
  title,
  description,
  index = true,
}: PageMetadataInput): Metadata {
  const isHome = path === "/";
  const fullTitle = isHome ? title : `${title} — ${SITE_NAME}`;

  return {
    title: isHome ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      ...(isHome ? { types: { "text/plain": "/llms.txt" } } : {}),
    },
    openGraph: {
      type: "website",
      locale: "en_AE",
      siteName: SITE_NAME,
      url: path,
      title: fullTitle,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SHARE_IMAGE],
    },
    ...(index ? {} : { robots: { index: false, follow: true } }),
  };
}
