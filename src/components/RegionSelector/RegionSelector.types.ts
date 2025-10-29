// components/RegionSelector/RegionSelector.types.ts
import type { RegionEnum } from "@/lib/strapi";

export interface RegionSelectorProps {
  selectedRegion: RegionEnum | null;
  onRegionChange: (region: RegionEnum | null) => void;
  availableRegions: RegionEnum[];
}