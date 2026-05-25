export type ReachCityTier = "primary" | "extended";

export type ReachCity = {
  name: string;
  tier: ReachCityTier;
};

export type ReachRegionTiered = {
  id: string;
  name: string;
  image: string;
  primaryHubs: readonly string[];
  extendedNetwork: readonly string[];
};
