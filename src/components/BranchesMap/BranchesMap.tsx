/*
// components/BranchesMap/BranchesMap.tsx
"use client";

import { useState, useMemo } from "react";
import type { RegionEnum } from "@/lib/strapi";
import { CzechMap } from "../CzechMap";
import { RegionSelector } from "../RegionSelector";
import { BranchCard } from "../BranchCard ";
import type { BranchesMapProps } from "./BranchesMap.types";

export function BranchesMap({ branches }: BranchesMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<RegionEnum | null>(null);

  const availableRegions = useMemo(() => {
    const regions = branches.map((branch) => branch.Region);
    return Array.from(new Set(regions));
  }, [branches]);

  const filteredBranches = useMemo(() => {
    if (!selectedRegion) return branches;
    return branches.filter((branch) => branch.Region === selectedRegion);
  }, [branches, selectedRegion]);

  return (
    <div className="w-full">
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">
        <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
          <CzechMap
            activeRegion={selectedRegion}
            onRegionClick={setSelectedRegion}
            availableRegions={availableRegions}
          />
        </div>

        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-neutral-800 mb-2">
              Pobočky v oblasti
            </h2>
            {selectedRegion && (
              <button
                onClick={() => setSelectedRegion(null)}
                className="text-golden-gate hover:underline text-sm"
              >
                Zobrazit všechny pobočky
              </button>
            )}
            {selectedRegion && (
              <p className="text-neutral-600 mt-2">{selectedRegion}</p>
            )}
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {filteredBranches.length > 0 ? (
              filteredBranches.map((branch) => (
                <BranchCard key={branch.id} branch={branch} />
              ))
            ) : (
              <p className="text-neutral-600">V tomto kraji nemáme pobočku.</p>
            )}
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="mb-6">
          <RegionSelector
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
            availableRegions={availableRegions}
          />
        </div>

        <div className="space-y-4">
          {filteredBranches.length > 0 ? (
            filteredBranches.map((branch) => (
              <BranchCard key={branch.id} branch={branch} />
            ))
          ) : (
            <p className="text-neutral-600">V tomto kraji nemáme pobočku.</p>
          )}
        </div>
      </div>
    </div>
  );
}
*/

/*
// components/BranchesMap/BranchesMap.tsx
"use client";

import { useState, useMemo } from "react";
import type { RegionEnum } from "@/lib/strapi";
import { CzechMap } from "../CzechMap";
import { BranchCard } from "../BranchCard ";
import type { BranchesMapProps } from "./BranchesMap.types";

export function BranchesMap({ branches }: BranchesMapProps) {
  // Defaultně vybraná Praha
  const [selectedRegion, setSelectedRegion] =
    useState<RegionEnum>("Hlavní město Praha");

  // Získej seznam krajů, které mají pobočky
  const availableRegions = useMemo(() => {
    const regions = branches.map((branch) => branch.Region);
    return Array.from(new Set(regions));
  }, [branches]);

  // Filtruj pobočky podle vybraného kraje
  const filteredBranches = useMemo(() => {
    return branches.filter((branch) => branch.Region === selectedRegion);
  }, [branches, selectedRegion]);

  return (
    <div className="w-full">
      <div className="hidden lg:block">
        <div className="grid lg:grid-cols-2 lg:gap-8">
          <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
            <CzechMap
              activeRegion={selectedRegion}
              onRegionClick={setSelectedRegion}
              availableRegions={availableRegions}
            />
          </div>

          <div>
            <div className="bg-[#FF6B35] rounded-lg p-6 mb-6">
              <h3 className="text-white text-xl font-bold mb-4">
                Pobočky v oblasti
              </h3>
              <select
                value={selectedRegion}
                onChange={(e) =>
                  setSelectedRegion(e.target.value as RegionEnum)
                }
                className="w-full px-4 py-3 bg-[#E63C11] text-white rounded-lg border-none focus:ring-2 focus:ring-white focus:outline-none appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "1.5em 1.5em",
                  paddingRight: "2.5rem",
                }}
              >
                {availableRegions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {filteredBranches.length > 0 ? (
                filteredBranches.map((branch) => (
                  <BranchCard key={branch.id} branch={branch} />
                ))
              ) : (
                <p className="text-neutral-600">
                  V tomto kraji nemáme pobočku.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="bg-[#FF6B35] rounded-lg p-6 mb-6">
          <h3 className="text-white text-xl font-bold mb-4">
            Pobočky v oblasti
          </h3>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value as RegionEnum)}
            className="w-full px-4 py-3 bg-[#E63C11] text-white rounded-lg border-none focus:ring-2 focus:ring-white focus:outline-none appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1.5em 1.5em",
              paddingRight: "2.5rem",
            }}
          >
            {availableRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          {filteredBranches.length > 0 ? (
            filteredBranches.map((branch) => (
              <BranchCard key={branch.id} branch={branch} />
            ))
          ) : (
            <p className="text-neutral-600">V tomto kraji nemáme pobočku.</p>
          )}
        </div>
      </div>
    </div>
  );
}
*/

/*
// components/BranchesMap/BranchesMap.tsx
"use client";

import { useState, useMemo } from "react";
import type { RegionEnum } from "@/lib/strapi";
import { CzechMap } from "../CzechMap";
import { BranchCard } from "../BranchCard ";
import type { BranchesMapProps } from "./BranchesMap.types";

export function BranchesMap({ branches }: BranchesMapProps) {
  const [selectedRegion, setSelectedRegion] =
    useState<RegionEnum>("Hlavní město Praha");

  const availableRegions = useMemo(() => {
    const regions = branches.map((branch) => branch.Region);
    return Array.from(new Set(regions));
  }, [branches]);

  const filteredBranches = useMemo(() => {
    return branches.filter((branch) => branch.Region === selectedRegion);
  }, [branches, selectedRegion]);

  return (
    <div className="w-full">
      <div className="hidden lg:block">
        <div className="grid lg:grid-cols-[768px_1fr] lg:gap-8 items-start">
          <div className="flex items-center justify-center">
            <CzechMap
              activeRegion={selectedRegion}
              onRegionClick={setSelectedRegion}
              availableRegions={availableRegions}
            />
          </div>

          <div className="bg-neutral-50 rounded-lg">
            <div className="bg-[#FF6B35] rounded-t-lg p-6">
              <h3 className="text-white text-2xl font-bold mb-4 [font-family:var(--font-nunito)]">
                Pobočky v oblasti
              </h3>
              <select
                value={selectedRegion}
                onChange={(e) =>
                  setSelectedRegion(e.target.value as RegionEnum)
                }
                className="w-full px-4 py-3 bg-[#E63C11] text-white text-lg rounded-lg border-none focus:ring-2 focus:ring-white focus:outline-none appearance-none cursor-pointer [font-family:var(--font-nunito)]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "1.5em 1.5em",
                  paddingRight: "2.5rem",
                }}
              >
                {availableRegions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-6 space-y-6 max-h-[600px] overflow-y-auto">
              {filteredBranches.length > 0 ? (
                filteredBranches.map((branch) => (
                  <BranchCard key={branch.id} branch={branch} />
                ))
              ) : (
                <p className="text-neutral-600 text-center py-8">
                  V tomto kraji nemáme pobočku.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="bg-[#FF6B35] rounded-lg p-4 sm:p-6 mb-4">
          <h3 className="text-white text-xl sm:text-2xl font-bold mb-3 sm:mb-4 [font-family:var(--font-nunito)]">
            Pobočky v oblasti
          </h3>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value as RegionEnum)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#E63C11] text-white text-base sm:text-lg rounded-lg border-none focus:ring-2 focus:ring-white focus:outline-none appearance-none cursor-pointer [font-family:var(--font-nunito)]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1.5em 1.5em",
              paddingRight: "2.5rem",
            }}
          >
            {availableRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          {filteredBranches.length > 0 ? (
            filteredBranches.map((branch) => (
              <BranchCard key={branch.id} branch={branch} />
            ))
          ) : (
            <p className="text-neutral-600 text-center py-8">
              V tomto kraji nemáme pobočku.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
*/

// components/BranchesMap/BranchesMap.tsx
"use client";

import { useState, useMemo } from "react";
import type { RegionEnum } from "@/lib/strapi";
import { CzechMap } from "../CzechMap";
import { BranchCard } from "../BranchCard ";
import type { BranchesMapProps } from "./BranchesMap.types";

export function BranchesMap({ branches }: BranchesMapProps) {
  const [selectedRegion, setSelectedRegion] =
    useState<RegionEnum>("Hlavní město Praha");

  const availableRegions = useMemo(() => {
    const regions = branches.map((branch) => branch.Region);
    return Array.from(new Set(regions));
  }, [branches]);

  const filteredBranches = useMemo(() => {
    return branches.filter((branch) => branch.Region === selectedRegion);
  }, [branches, selectedRegion]);

  return (
    <div className="w-full">
      {/* Desktop: Mapa + Dropdown + Pobočky */}
      <div className="hidden lg:block">
        <div className="grid lg:grid-cols-[768px_1fr] lg:gap-8 items-start">
          {/* Mapa - bez pozadí, max-width 768px */}
          <div className="flex items-center justify-center">
            <CzechMap
              activeRegion={selectedRegion}
              onRegionClick={setSelectedRegion}
              availableRegions={availableRegions}
            />
          </div>

          {/* Dropdown a Seznam poboček */}
          <div className="bg-neutral-50 rounded-lg overflow-hidden">
            {/* Dropdown podle designu */}
            <div className="bg-[#FF6B35] p-6">
              <h3 className="text-white text-2xl font-bold mb-4 [font-family:var(--font-nunito)]">
                Pobočky v oblasti
              </h3>
              <select
                value={selectedRegion}
                onChange={(e) =>
                  setSelectedRegion(e.target.value as RegionEnum)
                }
                className="w-full px-4 py-3 bg-[#E63C11] text-white text-lg rounded-lg border-none focus:ring-2 focus:ring-white focus:outline-none appearance-none cursor-pointer [font-family:var(--font-nunito)]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "1.5em 1.5em",
                  paddingRight: "2.5rem",
                }}
              >
                {availableRegions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* Seznam poboček s dividerem */}
            <div className="max-h-[600px] overflow-y-auto">
              {filteredBranches.length > 0 ? (
                <div className="divide-y divide-neutral-200">
                  {filteredBranches.map((branch) => (
                    <div key={branch.id} className="p-6">
                      <BranchCard branch={branch} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6">
                  <p className="text-neutral-600 text-center py-8">
                    V tomto kraji nemáme pobočku.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Pouze dropdown a pobočky (bez mapy) */}
      <div className="lg:hidden">
        {/* Dropdown podle designu */}
        <div className="bg-[#FF6B35] rounded-lg p-4 sm:p-6 mb-4">
          <h3 className="text-white text-xl sm:text-2xl font-bold mb-3 sm:mb-4 [font-family:var(--font-nunito)]">
            Pobočky v oblasti
          </h3>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value as RegionEnum)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#E63C11] text-white text-base sm:text-lg rounded-lg border-none focus:ring-2 focus:ring-white focus:outline-none appearance-none cursor-pointer [font-family:var(--font-nunito)]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1.5em 1.5em",
              paddingRight: "2.5rem",
            }}
          >
            {availableRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* Seznam poboček s dividerem */}
        <div className="bg-neutral-50 rounded-lg overflow-hidden">
          {filteredBranches.length > 0 ? (
            <div className="divide-y divide-neutral-200">
              {filteredBranches.map((branch) => (
                <div key={branch.id} className="p-4 sm:p-6">
                  <BranchCard branch={branch} />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6">
              <p className="text-neutral-600 text-center py-8">
                V tomto kraji nemáme pobočku.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
