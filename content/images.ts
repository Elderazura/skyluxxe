export const logos = {
  fullRoseGold: "/logos/Skyluxxe_Logo-01.png",
  fullRoseGoldClean: "/logos/Skyluxxe_Logo-02.png",
  fullWhite: "/logos/Skyluxxe_Logo-03.png",
  fullBlack: "/logos/Skyluxxe_Logo-04.png",
  monogramRoseGold: "/logos/Skyluxxe_Logo-05.png",
  monogramBlack: "/logos/Skyluxxe_Logo-06.png",
} as const;

export const brandImages = {
  monogramNavy: "/images/brand/monogram-navy.png",
  giftBox: "/images/brand/gift-box.png",
  inFlightUmbrella: "/images/brand/in-flight-umbrella.png",
  receptionDesk: "/images/brand/reception-desk.png",
  leatherJournal: "/images/brand/leather-journal.png",
  beachsideDining: "/images/brand/beachside-dining.png",
  candleStationery: "/images/brand/candle-stationery.png",
  luggageTag: "/images/brand/luggage-tag.png",
  privateJetTarmac: "/images/brand/private-jet-tarmac.png",
  membershipCard: "/images/brand/membership-card.png",
  luxuryAccessories: "/images/brand/luxury-accessories.png",
  cufflinks: "/images/brand/cufflinks.png",
  travelBag: "/images/brand/travel-bag.png",
  coastalTote: "/images/brand/coastal-tote.png",
  luxuryLuggage: "/images/brand/luxury-luggage.png",
  cashmereBlanket: "/images/brand/cashmere-blanket.png",
  conciergeLounge: "/images/brand/concierge-lounge.png",
} as const;

/** Web-optimized loop for backgrounds (H.264, ~1280px max). Source: `public/hero.mp4`. */
export const videos = {
  openingStatementBg: "/opening-statement-bg.mp4",
} as const;

export const lifestyleImages = {
  jetSunsetAerial: "/new_images/06_Private_Yacht_Superyacht_Charter_Sunset.png",
  jetTarmacAerial: "/new_images/01_Cover_Private_Aviation_Daylight_Hero.png",
  jetStairsTarmac: "/new_images/03_VIP_Airport_Meet_Assist_Corridor.png",
  manExitingJet: "/new_images/01_COVER_Private_Aviation_Arrival.png",
  jetCabinReading: "/new_images/02_VIP_Airport_Concierge_Lounge.png",
  jetCabinInterior: "/new_images/02_Private_Terminal_Lounge_Greeting.png",
  carBackseat: "/new_images/04_Chauffeured_Luxury_Mobility_Daylight.png",
  hotelChauffeur: "/new_images/04_Chauffeured_Luxury_Mobility_Hotel_Arrival.png",
  /** Full-bleed home ImageBreak — arrival / terminal mood */
  vipTerminalSunset: "/new_images/02_Private_Terminal_Lounge_Greeting.png",
  womanCarGolden: "/new_images/04_Chauffeured_Luxury_Mobility_Daylight.png",
  parisLuggage: "/new_images/07_Signature_Journeys_Cultural_Experience.png",
  yachtBreakfast: "/new_images/06_Private_Yacht_Superyacht_Daylight.png",
  womanCarCobblestone: "/new_images/04_Chauffeured_Luxury_Mobility_Daylight.png",
  safariDining: "/new_images/05_Luxury_Stays_Resort_Collection_Coastal_Suite.png",
} as const;

export const serviceImages: Record<string, string> = {
  "private-aviation": lifestyleImages.jetTarmacAerial,
  "vip-airport-concierge": lifestyleImages.jetStairsTarmac,
  "private-jet-charter": lifestyleImages.jetTarmacAerial,
  "private-yacht-charter": lifestyleImages.yachtBreakfast,
  "luxury-hotel-villa-stays":
    "/new_images/05_Luxury_Stays_Resort_Collection_Coastal_Suite.png",
  "prestige-events-access":
    "/new_images/08_Prestige_Events_Elite_Access_Motorsport_Lounge.png",
  "executive-protection-travel":
    "/new_images/09_Royal_Executive_Protection_Travel_Management.png",
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
