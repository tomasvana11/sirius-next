// components/PartnersList/PartnersList.tsx
import React from "react";
import Image from "next/image";
import { getPartners } from "@/lib/strapi";
import { cn } from "@/lib/utils";
import type { PartnersListProps } from "./PartnersList.types";

export const PartnersList = async ({
  limit = "all",
  className,
}: PartnersListProps) => {
  const partners = await getPartners(limit);

  if (!partners || partners.length === 0) {
    return null;
  }

  return (
    <section className={cn(className)}>
      {/* Desktop: 6 sloupců, Tablet: 4 sloupce, Mobile: 3 sloupce */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {partners.map((partner) => {
          const logoUrl = partner.Logo?.[0]?.url ?? null;

          return (
            <div
              key={partner.id}
              className="flex items-center justify-center bg-white border-2 border-neutral-200 rounded-xl p-6 aspect-[3/1]"
            >
              {logoUrl ? (
                <div className="relative w-full h-full">
                  <Image
                    src={logoUrl}
                    alt={partner.Logo?.[0]?.alternativeText || partner.Title}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <Image
                    src="/icons/system/img-placeholder.svg"
                    alt="Placeholder"
                    width={64}
                    height={64}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
