// components/TestimonialCard/TestimonialCard.tsx
import React from "react";
import Image from "next/image";
import { renderRichText } from "@/lib/strapi";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { TestimonialCardProps } from "./TestimonialCard.types";

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  review,
  name,
  yearsBeingClient,
  className,
}) => {
  return (
    <div
      className={cn("bg-neutral-100 rounded-xl p-4 flex flex-col", className)}
    >
      {/* Ikonka uvozovek */}
      <Image
        src="/icons/system/quotes.svg"
        alt="Quotes"
        width={56}
        height={56}
        className="mb-4 w-11 h-11 md:w-14 md:h-14"
      />

      {/* Reference text */}
      <div className="text-xl text-neutral-700 mb-4 flex-grow break-words [font-family:var(--font-nunito)] [font-weight:500]">
        {renderRichText(review)}
      </div>

      {/* Separator */}
      <Separator className="bg-neutral-300" />

      {/* Jméno */}
      <p className="text-base font-bold text-neutral-800 mt-4">{name}</p>

      {/* Klient/ka X let */}
      <p className="text-sm text-neutral-600">
        Klient/ka {yearsBeingClient}+ let
      </p>
    </div>
  );
};
