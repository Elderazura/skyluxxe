import { brandImages, lifestyleImages } from "@/content/images";

export type CrossLinkItem = {
  href: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

/** Default “glimpse” promos used across marketing pages. */
export const crossLinkExplore: readonly CrossLinkItem[] = [
  {
    href: "/about",
    title: "Our story",
    description: "Heritage, philosophy, and the quiet standards behind every journey.",
    imageSrc: brandImages.leatherJournal,
    imageAlt: "Fine leather journal — editorial craft and permanence.",
  },
  {
    href: "/reach",
    title: "Global reach",
    description: "Where we operate — hubs, regions, and the network that holds you.",
    imageSrc: lifestyleImages.parisLuggage,
    imageAlt: "Luggage in a world capital — composed arrival.",
  },
  {
    href: "/journal",
    title: "Journal",
    description: "Notes on travel, taste, and the art of invisible service.",
    imageSrc: brandImages.cashmereBlanket,
    imageAlt: "Cashmere and calm — the texture of considered travel.",
  },
  {
    href: "/enquiry",
    title: "Private enquiry",
    description: "Begin with a confidential conversation — we respond within twenty-four hours.",
    imageSrc: brandImages.receptionDesk,
    imageAlt: "Reception desk — discretion and welcome.",
  },
] as const;
