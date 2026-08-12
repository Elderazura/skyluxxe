export const logos = {
  fullRoseGold: "/logos/Skyluxxe_Logo-01.png",
  fullRoseGoldClean: "/logos/Skyluxxe_Logo-02.png",
  fullWhite: "/logos/Skyluxxe_Logo-03.png",
  fullBlack: "/logos/Skyluxxe_Logo-04.png",
  monogramRoseGold: "/logos/Skyluxxe_Logo-05.png",
  monogramBlack: "/logos/Skyluxxe_Logo-06.png",
} as const;

export const brandImages = {
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
} as const;

export const lifestyleImages = {
  jetSunsetAerial: "/new_images/06_Private_Yacht_Superyacht_Charter_Sunset.webp",
  jetTarmacAerial: "/new_images/01_Cover_Private_Aviation_Daylight_Hero.webp",
  jetStairsTarmac: "/new_images/03_VIP_Airport_Meet_Assist_Corridor.webp",
  manExitingJet: "/new_images/01_COVER_Private_Aviation_Arrival.webp",
  jetCabinReading: "/new_images/02_VIP_Airport_Concierge_Lounge.webp",
  jetCabinInterior: "/new_images/02_Private_Terminal_Lounge_Greeting.webp",
  carBackseat: "/new_images/04_Chauffeured_Luxury_Mobility_Daylight.webp",
  hotelChauffeur: "/new_images/04_Chauffeured_Luxury_Mobility_Hotel_Arrival.webp",
  /** Full-bleed home ImageBreak — arrival / terminal mood */
  vipTerminalSunset: "/new_images/02_Private_Terminal_Lounge_Greeting.webp",
  womanCarGolden: "/new_images/04_Chauffeured_Luxury_Mobility_Daylight.webp",
  parisLuggage: "/new_images/07_Signature_Journeys_Cultural_Experience.webp",
  yachtBreakfast: "/new_images/06_Private_Yacht_Superyacht_Daylight.webp",
  womanCarCobblestone: "/new_images/04_Chauffeured_Luxury_Mobility_Daylight.webp",
  safariDining: "/new_images/05_Luxury_Stays_Resort_Collection_Coastal_Suite.webp",
} as const;

export const serviceImages: Record<string, string> = {
  "private-aviation": lifestyleImages.jetTarmacAerial,
  "vip-airport-concierge": lifestyleImages.jetStairsTarmac,
  "private-jet-charter": lifestyleImages.jetTarmacAerial,
  "private-yacht-charter": lifestyleImages.yachtBreakfast,
  "luxury-hotel-villa-stays":
    "/new_images/05_Luxury_Stays_Resort_Collection_Coastal_Suite.webp",
  "prestige-events-access":
    "/new_images/08_Prestige_Events_Elite_Access_Motorsport_Lounge.webp",
  "executive-protection-travel":
    "/new_images/09_Royal_Executive_Protection_Travel_Management.webp",
  "private-island-retreats": lifestyleImages.safariDining,
  "luxury-ground-transport": lifestyleImages.womanCarCobblestone,
  "bespoke-itinerary-design": lifestyleImages.parisLuggage,
  "family-office-travel": lifestyleImages.jetCabinInterior,
};

export const sphereImages: Record<string, string> = {
  air: lifestyleImages.jetTarmacAerial,
  sea: lifestyleImages.yachtBreakfast,
  stay: lifestyleImages.hotelChauffeur,
  lifestyle: lifestyleImages.jetCabinReading,
};

const CTA_BG_IMAGES = [
  brandImages.cashmereBlanket,
  brandImages.luxuryAccessories,
  brandImages.travelBag,
  lifestyleImages.carBackseat,
] as const;

export function getCtaBgImage(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  return CTA_BG_IMAGES[Math.abs(hash) % CTA_BG_IMAGES.length];
}
