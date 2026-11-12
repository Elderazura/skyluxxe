export const logos = {
  fullRoseGold: "/logos/Skyluxxe_Logo-01.png",
  fullRoseGoldClean: "/logos/Skyluxxe_Logo-02.png",
  fullWhite: "/logos/Skyluxxe_Logo-03.png",
  fullBlack: "/logos/Skyluxxe_Logo-04.png",
  monogramRoseGold: "/logos/Skyluxxe_Logo-05.png",
  monogramBlack: "/logos/Skyluxxe_Logo-06.png",
} as const;

export const brandImages = {
  /** First frame of the hero video — shown until (or instead of) the video. */
  heroPoster: "/images/brand/hero-poster.webp",
  monogramNavy: "/images/brand/monogram-navy.webp",
  giftBox: "/images/brand/gift-box.webp",
  inFlightUmbrella: "/images/brand/in-flight-umbrella.webp",
  receptionDesk: "/images/brand/reception-desk.webp",
  leatherJournal: "/images/brand/leather-journal.webp",
  beachsideDining: "/images/brand/beachside-dining.webp",
  candleStationery: "/images/brand/candle-stationery.webp",
  luggageTag: "/images/brand/luggage-tag.webp",
  privateJetTarmac: "/images/brand/private-jet-tarmac.webp",
  membershipCard: "/images/brand/membership-card.webp",
  luxuryAccessories: "/images/brand/luxury-accessories.webp",
  cufflinks: "/images/brand/cufflinks.webp",
  travelBag: "/images/brand/travel-bag.webp",
  coastalTote: "/images/brand/coastal-tote.webp",
  luxuryLuggage: "/images/brand/luxury-luggage.webp",
  cashmereBlanket: "/images/brand/cashmere-blanket.webp",
  conciergeLounge: "/images/brand/concierge-lounge.webp",
} as const;

/** Web-optimized loop for backgrounds (H.264, ~1280px max). Source: `public/hero.mp4`. */
export const videos = {
  openingStatementBg: "/opening-statement-bg.mp4",
  /** 540p encode (~1.6MB) served to narrow viewports. */
  openingStatementBgMobile: "/opening-statement-bg-mobile.mp4",
} as const;

/*
 * Keys describe what is actually in each photograph. They used to carry the
 * names of an earlier image set (`jetCabinReading` pointed at an airport
 * lounge, `safariDining` at a coastal suite), which is how alt text across the
 * site came to describe pictures that were no longer there.
 */
export const lifestyleImages = {
  /** Couple on a yacht aft deck watching the sun set over a coastline. */
  yachtSunset: "/new_images/06_Private_Yacht_Superyacht_Charter_Sunset.webp",
  /** Couple walking from a private jet to a waiting car and chauffeur, daylight. */
  jetArrivalDaylight: "/new_images/01_Cover_Private_Aviation_Daylight_Hero.webp",
  /** Same arrival at dusk, city skyline behind the aircraft. */
  jetArrivalSunset: "/new_images/01_COVER_Private_Aviation_Arrival.webp",
  /** Greeter escorting a couple along a roped terminal corridor. */
  terminalCorridorEscort: "/new_images/03_VIP_Airport_Meet_Assist_Corridor.webp",
  /** Host welcoming a traveller in a private lounge, jet visible through the glass (dusk). */
  loungeWelcome: "/new_images/02_VIP_Airport_Concierge_Lounge.webp",
  /** Handshake greeting in a private terminal lounge, jet outside (daylight). */
  terminalLoungeGreeting: "/new_images/02_Private_Terminal_Lounge_Greeting.webp",
  /** Chauffeur holding the door as a couple step out at a residence, daylight. */
  chauffeurArrivalDaylight: "/new_images/04_Chauffeured_Luxury_Mobility_Daylight.webp",
  /** Chauffeured arrival under a hotel porte-cochère at dusk. */
  hotelArrivalEvening: "/new_images/04_Chauffeured_Luxury_Mobility_Hotel_Arrival.webp",
  /** Small group on a private guided visit to a Moorish palace courtyard. */
  culturalTour: "/new_images/07_Signature_Journeys_Cultural_Experience.webp",
  /** Couple on a yacht deck in daylight, mountains across the water. */
  yachtDeckDaylight: "/new_images/06_Private_Yacht_Superyacht_Daylight.webp",
  /** Couple on the terrace of an open-fronted suite overlooking the sea. */
  coastalSuite: "/new_images/05_Luxury_Stays_Resort_Collection_Coastal_Suite.webp",
  /** Resort collection exterior. */
  resortCollection: "/new_images/05_Luxury_Stays_Resort_Collection.webp",
  /** Guests on a hospitality terrace above a motor-racing circuit at dusk. */
  motorsportLounge: "/new_images/08_Prestige_Events_Elite_Access_Motorsport_Lounge.webp",
  /** Protection detail walking principals to a waiting vehicle. */
  executiveProtection: "/new_images/09_Royal_Executive_Protection_Travel_Management.webp",
} as const;

export const serviceImages: Record<string, string> = {
  "private-aviation": lifestyleImages.jetArrivalDaylight,
  "vip-airport-concierge": lifestyleImages.terminalCorridorEscort,
  "private-jet-charter": lifestyleImages.jetArrivalSunset,
  "private-yacht-charter": lifestyleImages.yachtDeckDaylight,
  "luxury-hotel-villa-stays": lifestyleImages.resortCollection,
  "prestige-events-access": lifestyleImages.motorsportLounge,
  "executive-protection-travel": lifestyleImages.executiveProtection,
  "private-island-retreats": lifestyleImages.coastalSuite,
  "luxury-ground-transport": lifestyleImages.chauffeurArrivalDaylight,
  "bespoke-itinerary-design": lifestyleImages.culturalTour,
  "family-office-travel": lifestyleImages.terminalLoungeGreeting,
};

export const sphereImages: Record<string, string> = {
  air: lifestyleImages.jetArrivalDaylight,
  sea: lifestyleImages.yachtDeckDaylight,
  stay: lifestyleImages.hotelArrivalEvening,
  lifestyle: lifestyleImages.motorsportLounge,
};

const CTA_BG_IMAGES = [
  brandImages.cashmereBlanket,
  brandImages.luxuryAccessories,
  brandImages.travelBag,
  lifestyleImages.chauffeurArrivalDaylight,
] as const;

export function getCtaBgImage(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  return CTA_BG_IMAGES[Math.abs(hash) % CTA_BG_IMAGES.length];
}
