// components/StepsSection/StepsSection.tsx
import React from "react";
import Icon from "@/components/Icon";
import { Title } from "@/components/Title";
import { ButtonLink } from "@/components/ButtonLink";
import { ContentWrapper } from "@/components/ContentWrapper";
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
    <section className="bg-[#EC4C19] py-16 lg:py-24 rounded-xl relative overflow-hidden">
      {/* Dekorativní pozadí */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at 70% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
        }}
      />

      <ContentWrapper className="relative z-10">
        {/* Nadpis */}
        <Title
          as="h2"
          className="text-white text-center mb-16 text-3xl lg:text-5xl"
        >
          {stepsData.Title}
        </Title>

        {/* Kroky */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {stepsData.Step.map((step) => (
            <div key={step.id} className="text-white">
              {/* Ikona */}
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6">
                <Icon
                  name={step.Icon?.Icon.trim() || "shield"}
                  size="L"
                  className="text-[#EC4C19] w-9 h-9"
                />
              </div>

              {/* Title */}
              <Title as="h3" className="text-white mb-4 text-xl lg:text-2xl">
                {step.Title}
              </Title>

              {/* Description */}
              <p className="text-white/90 text-base leading-relaxed whitespace-pre-line">
                {step.Description}
              </p>
            </div>
          ))}
        </div>

        {/* Rich text popisek */}
        {stepsData.additionalDescription && (
          <div className="text-white/90 text-lg text-center mb-8 max-w-2xl mx-auto [&_p]:mb-0">
            {renderRichText(stepsData.additionalDescription)}
          </div>
        )}

        {/* Tlačítko */}
        {finalButtonUrl && stepsData.button && (
          <div className="text-center">
            <ButtonLink
              href={finalButtonUrl}
              variant="secondary"
              className="bg-white text-[#EC4C19] hover:bg-neutral-100"
            >
              {stepsData.button.displayText}
            </ButtonLink>
          </div>
        )}
      </ContentWrapper>
    </section>
  );
};
