// components/FactsSection/FactsSection.tsx
import React from "react";
import { Title } from "@/components/Title";
import type { FactsSectionProps } from "./FactsSection.types";

export const FactsSection: React.FC<FactsSectionProps> = ({ factsData }) => {
  return (
    <section className="pt-8 lg:pt-14">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {factsData.fact.map((fact, index) => {
            // Definice velikostí pro každou kartu
            const cardClasses = [
              "lg:col-span-5 lg:row-span-1", // Karta 1: 10+ mld
              "lg:col-span-7 lg:row-span-1", // Karta 2: 150 aktivních poradců
              "lg:col-span-4 lg:row-span-1", // Karta 3: 94%
              "lg:col-span-4 lg:row-span-1", // Karta 4: ZDARMA
              "lg:col-span-4 lg:row-span-1", // Karta 5: Osobního průvodce
            ];

            return (
              <div
                key={fact.id}
                className={`bg-[#EC4C19]/10 rounded-xl p-6 ${
                  cardClasses[index] || ""
                }`}
              >
                {/* Text před hlavním textem */}
                {fact.textBefore && (
                  <p className="text-neutral-600 text-base mb-4">
                    {fact.textBefore}
                  </p>
                )}

                {/* Hlavní text */}
                <Title
                  as="h2"
                  className="text-[#EC4C19] text-2xl lg:text-4xl mb-4"
                >
                  {fact.mainText}
                </Title>

                {/* Text po hlavním textu */}
                {fact.textAfter && (
                  <p className="text-neutral-600 text-base">{fact.textAfter}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
