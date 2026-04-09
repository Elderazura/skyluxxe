export type ServiceCategory = "air" | "land" | "stay" | "lifestyle";

export type Service = {
  id: number;
  slug: string;
  name: string;
  romanNumeral: string;
  shortDescription: string;
  longDescription: string;
  category: ServiceCategory;
  /** Short CTA label on the services index (links to enquiry). */
  listCta: string;
};

export const services: readonly Service[] = [
  {
    id: 1,
    slug: "private-aviation",
    name: "Private Aviation",
    romanNumeral: "I",
    shortDescription:
      "Bespoke charter and ownership guidance shaped around your schedule, destinations, and standards. We align aircraft, crew, and logistics so every movement feels deliberate and calm.",
    longDescription:
      "Skyluxxe curates private aviation with the same care as a signature residence: aircraft selection, routing, and ownership structures reviewed with quiet rigor. Your team receives clear options, discreet coordination, and continuity across seasons. Whether you fly occasionally or maintain a fleet philosophy, we protect time, privacy, and predictability so the journey remains as composed as the arrival.",
    category: "air",
    listCta: "Arrange a call back",
  },
  {
    id: 2,
    slug: "vip-airport-concierge",
    name: "VIP Airport Concierge",
    romanNumeral: "II",
    shortDescription:
      "Arrivals, departures, and connections handled with minimal friction and maximum discretion. Meet-and-assist, fast-track where available, and seamless handoffs between ground and air.",
    longDescription:
      "Airports should not interrupt your rhythm. We choreograph greeters, lounges, immigration support, and luggage so you move through terminals with confidence. Transit is planned for contingency: delays, terminal changes, and last-minute reroutes are absorbed before they reach you. The experience is unhurried, attentive, and attuned to families, principals, and security-conscious travel alike.",
    category: "air",
    listCta: "Request airport assistance",
  },
  {
    id: 3,
    slug: "private-jet-charter",
    name: "Private Jet Charter",
    romanNumeral: "III",
    shortDescription:
      "On-demand access to suitable jets worldwide, matched to range, cabin, and timing. One request unlocks vetted operators, transparent options, and a single point of accountability.",
    longDescription:
      "Charter should feel like an extension of your office, not a gamble. We source aircraft against your priorities—cabin layout, catering sensitivities, and ground support—then hold the operation to a standard you can feel at wheels-up. Quotes are distilled to what matters; changes are managed with poise. You receive clarity, not noise, wherever you need to be.",
    category: "air",
    listCta: "Book your charter",
  },
  {
    id: 4,
    slug: "private-yacht-charter",
    name: "Private Yacht Charter",
    romanNumeral: "IV",
    shortDescription:
      "Exclusive maritime journeys with vessels chosen for comfort, crew excellence, and itinerary discipline. From quiet coastal weeks to multi-port exploration, the sea becomes a private stage.",
    longDescription:
      "A yacht charter is hospitality set against horizon and tide. We select yachts and captains who understand discretion, service rhythm, and safety without theatrics. Provisioning, shore experiences, and embarkation are orchestrated to your pace. Whether you seek solitude, celebration, or a working retreat at anchor, the voyage remains composed, warm, and entirely yours.",
    category: "lifestyle",
    listCta: "Plan a voyage",
  },
  {
    id: 5,
    slug: "luxury-hotel-villa-stays",
    name: "Luxury Hotel & Villa Stays",
    romanNumeral: "V",
    shortDescription:
      "Curated properties worldwide, secured with preferred consideration and tailored arrival details. Hotels and villas are chosen for service culture, privacy, and fit—not trends alone.",
    longDescription:
      "Where you stay defines how you recover and how you host. We place you in residences and hotels that honor your expectations: space, silence, culinary nuance, and staff who anticipate without hovering. Benefits and flexibility are negotiated with taste; special requests are handled before you ask. The result is a stay that feels inevitable, grounded in warmth and exacting taste.",
    category: "stay",
    listCta: "Reserve a stay",
  },
  {
    id: 6,
    slug: "prestige-events-access",
    name: "Prestige Events Access",
    romanNumeral: "VI",
    shortDescription:
      "Entry to gatherings where access is scarce and context matters. From sport and culture to invitation-only evenings, we align credentials, seating, and logistics with your calendar.",
    longDescription:
      "The right room at the right moment is both privilege and preparation. We secure invitations and hospitality packages with discretion, then support travel, security touchpoints, and guest protocols as needed. You arrive informed, appropriately introduced, and free to focus on the experience rather than the machinery behind it.",
    category: "lifestyle",
    listCta: "Request access",
  },
  {
    id: 7,
    slug: "executive-protection-travel",
    name: "Executive Protection Travel",
    romanNumeral: "VII",
    shortDescription:
      "Discreet, security-integrated travel planning for principals who require calm visibility management. Routes, venues, and movements are coordinated with trusted specialists.",
    longDescription:
      "Protection should feel like confidence, not performance. We collaborate with vetted close-protection partners to weave security into itineraries without overshadowing the journey. Advance work, vehicle protocols, and contingency routes are handled with restraint. Families and teams receive clarity; principals retain autonomy within a carefully managed perimeter.",
    category: "lifestyle",
    listCta: "Discuss confidential travel",
  },
  {
    id: 8,
    slug: "private-island-retreats",
    name: "Private Island Retreats",
    romanNumeral: "VIII",
    shortDescription:
      "Secluded island stays arranged for total privacy and unhurried rhythm. Estates, staff, and sea access are composed for restoration, celebration, or confidential retreat.",
    longDescription:
      "An island becomes a sanctuary when logistics vanish. We source exclusive-use properties and coordinate aviation, marine transfer, provisioning, and household staff to your standard. Days unfold without compromise: quiet beaches, curated meals, and the rare luxury of boundaries you control. We remain available, invisible, and attentive to the details that preserve the mood.",
    category: "stay",
    listCta: "Enquire about a retreat",
  },
  {
    id: 9,
    slug: "luxury-ground-transport",
    name: "Luxury Ground Transport",
    romanNumeral: "IX",
    shortDescription:
      "Chauffeur and motorcade services with vetted drivers, appropriate vehicles, and route intelligence. City movements and intercity legs are timed for poise and predictability.",
    longDescription:
      "Ground travel is where first impressions repeat themselves. We assign vehicles and chauffeurs matched to itinerary, party size, and security posture—always clean, punctual, and discreet. Traffic, alternate entrances, and meet locations are considered in advance. Whether a single transfer or a multi-day road program, the experience remains smooth, quiet, and assured.",
    category: "land",
    listCta: "Book ground transport",
  },
  {
    id: 10,
    slug: "bespoke-itinerary-design",
    name: "Bespoke Itinerary Design",
    romanNumeral: "X",
    shortDescription:
      "Custom-crafted journeys that unite flights, stays, experiences, and downtime into one coherent narrative. Every day is paced for clarity, delight, and room to breathe.",
    longDescription:
      "A journey should feel authored, not assembled. We listen for purpose—celebration, reconnection, legacy travel—then design routes, pacing, and moments that honor it. Specialists refine dining, culture, and private access; contingencies are embedded without cluttering the plan. You receive a single itinerary, human support, and the sense that nothing was left to chance.",
    category: "lifestyle",
    listCta: "Design an itinerary",
  },
  {
    id: 11,
    slug: "family-office-travel",
    name: "Family Office Travel",
    romanNumeral: "XI",
    shortDescription:
      "Multi-generational and principal-office travel managed with one accountable concierge layer. Complex calendars, households, and preferences are harmonized across trips and years.",
    longDescription:
      "Family offices move people, assets, and reputations in parallel. We provide a dedicated travel architecture: consolidated planning, preferred partners, and institutional memory of preferences and sensitivities. From education seasons to summit weeks, movements align with governance and privacy. The service is steady, warm, and precise—so principals and households can travel with confidence.",
    category: "lifestyle",
    listCta: "Speak with our desk",
  },
];

/** In-page anchor ids used by marketing links (e.g. /services#air). */
export function serviceOverviewAnchorId(
  service: Service,
): string | undefined {
  if (service.slug === "private-aviation") return "air";
  if (service.slug === "private-yacht-charter") return "sea";
  if (service.slug === "luxury-hotel-villa-stays") return "stay";
  if (service.slug === "prestige-events-access") return "lifestyle";
  return undefined;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Hero label: Air / Sea (yacht) / Land / Stay / Lifestyle */
export function serviceCategoryLabel(service: Service): string {
  if (service.slug === "private-yacht-charter") return "Sea";
  const map: Record<ServiceCategory, string> = {
    air: "Air",
    land: "Land",
    stay: "Stay",
    lifestyle: "Lifestyle",
  };
  return map[service.category];
}
