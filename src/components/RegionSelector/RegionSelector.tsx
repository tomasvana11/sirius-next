/*
// components/RegionSelector/RegionSelector.tsx
"use client";

import type { RegionSelectorProps } from "./RegionSelector.types";

export function RegionSelector({
  selectedRegion,
  onRegionChange,
  availableRegions,
}: RegionSelectorProps) {
  return (
    <div className="w-full">
      <label
        htmlFor="region-select"
        className="block text-sm font-medium text-neutral-700 mb-2"
      >
        Vyberte kraj
      </label>
      <select
        id="region-select"
        value={selectedRegion || ""}
        onChange={(e) =>
          onRegionChange(e.target.value ? (e.target.value as any) : null)
        }
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-gate focus:border-golden-gate transition-colors"
      >
        <option value="">Všechny pobočky</option>
        {availableRegions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}
*/

// components/RegionSelector/RegionSelector.tsx
"use client";

import type { RegionEnum } from "@/lib/strapi";
import type { RegionSelectorProps } from "./RegionSelector.types";

export function RegionSelector({
  selectedRegion,
  onRegionChange,
  availableRegions,
}: RegionSelectorProps) {
  return (
    <div className="w-full">
      <label
        htmlFor="region-select"
        className="block text-sm font-medium text-neutral-700 mb-2"
      >
        Vyberte kraj
      </label>
      <select
        id="region-select"
        value={selectedRegion || ""}
        onChange={(e) =>
          onRegionChange(e.target.value ? (e.target.value as RegionEnum) : null)
        }
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-gate focus:border-golden-gate transition-colors"
      >
        <option value="">Všechny pobočky</option>
        {availableRegions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}
