// components/StepsSection/StepsSection.tsx
import React from "react";
import Icon from "@/components/Icon";
import { Title } from "@/components/Title";
import { ButtonLink } from "@/components/ButtonLink";
import { renderRichText } from "@/lib/strapi";
import type { StepsSectionProps } from "./StepsSection.types";

export const StepsSection: React.FC<StepsSectionProps> = ({ stepsData }) => {
  // Funkce pro vytvoření URL slug z textu
  const createSlug = (text: string): string => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Logika pro tlačítko (stejně jako u Hero)
  const finalButtonUrl = stepsData.button?.isExternal
    ? stepsData.button.Url
    : stepsData.button?.Page
    ? `/${createSlug(stepsData.button.Page)}`
    : null;

  return (
    <section className="bg-gradient-to-b from-[#EC4C19] to-[#EB361C] px-4 lg:px-12 py-8 lg:py-12 rounded-xl relative overflow-hidden">
      {/* Dekorativní pozadí */}
      <div
        className="absolute bottom-0 -left-10 lg:left-24 w-[110%] md:w-[80%] h-full pointer-events-none"
        style={{
          backgroundImage: "url('/img/steps-homepage-pattern.png')",
          backgroundPosition: "bottom center",
          backgroundSize: "100% auto",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative z-10">
        {/* Nadpis */}
        <Title as="h3" className="text-white mb-6 lg:mb-12 ">
          {stepsData.Title}
        </Title>

        {/* Kroky */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {stepsData.Step.map((step) => (
            <div key={step.id} className="text-white">
              {/* Ikona */}
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 lg:mb-5">
                <Icon
                  name={step.Icon?.Icon.trim() || "shield"}
                  size="L"
                  className="text-[#EC4C19] w-6 h-6"
                />
              </div>

              {/* Title */}
              <Title
                as="h4"
                className="text-white mb-3 lg:mb-4 text-xl lg:text-2xl"
              >
                {step.Title}
              </Title>

              {/* Description */}
              <p className="text-white/80 text-base leading-relaxed whitespace-pre-line">
                {step.Description}
              </p>
            </div>
          ))}
        </div>

        {/* Rich text popisek */}
        {stepsData.additionalDescription && (
          <div className="text-white/90 text-lg mb-6 lg:mb-8 max-w-xl [&_p]:mb-0">
            {renderRichText(stepsData.additionalDescription)}
          </div>
        )}

        {/* Tlačítko */}
        {finalButtonUrl && stepsData.button && (
          <ButtonLink href={finalButtonUrl} variant="primary" theme="light2">
            {stepsData.button.displayText}
          </ButtonLink>
        )}
      </div>
    </section>
  );
};
