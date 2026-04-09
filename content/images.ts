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

export const lifestyleImages = {
  jetSunsetAerial: "/images/website/jet-sunset-aerial.png",
  jetTarmacAerial: "/images/website/jet-tarmac-aerial.png",
  jetStairsTarmac: "/images/website/jet-stairs-tarmac.png",
  manExitingJet: "/images/website/man-exiting-jet.png",
  jetCabinReading: "/images/website/jet-cabin-reading.png",
  jetCabinInterior: "/images/website/jet-cabin-interior.png",
  carBackseat: "/images/website/car-backseat.png",
  hotelChauffeur: "/images/website/hotel-chauffeur.png",
  womanCarGolden: "/images/website/woman-car-golden.png",
  parisLuggage: "/images/website/paris-luggage.png",
  yachtBreakfast: "/images/website/yacht-breakfast.png",
  womanCarCobblestone: "/images/website/woman-car-cobblestone.png",
  safariDining: "/images/website/safari-dining.png",
} as const;

export const serviceImages: Record<string, string> = {
  "private-aviation": lifestyleImages.jetTarmacAerial,
  "vip-airport-concierge": lifestyleImages.jetStairsTarmac,
  "private-jet-charter": lifestyleImages.jetCabinReading,
  "private-yacht-charter": lifestyleImages.yachtBreakfast,
  "luxury-hotel-villa-stays": lifestyleImages.hotelChauffeur,
  "prestige-events-access": brandImages.cufflinks,
  "executive-protection-travel": lifestyleImages.carBackseat,
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
