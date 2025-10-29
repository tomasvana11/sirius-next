// components/CzechMap/CzechMap.types.ts
import type { RegionEnum } from "@/lib/strapi";

export interface CzechMapProps {
  activeRegion: RegionEnum | null;
  onRegionClick: (region: RegionEnum) => void;
  availableRegions: RegionEnum[];
}