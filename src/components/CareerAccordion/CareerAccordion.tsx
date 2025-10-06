// components/CareerAccordion/CareerAccordion.tsx
import React from "react";
import { getCareerQuestions, renderRichText } from "@/lib/strapi";
import { Title } from "@/components/Title";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { CareerAccordionProps } from "./CareerAccordion.types";

export const CareerAccordion = async ({ className }: CareerAccordionProps) => {
  const questionsSection = await getCareerQuestions();

  if (!questionsSection) {
    return null;
  }

  return (
    <section
      className={cn(
        "grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16  py-8 lg:py-12",
        className
      )}
    >
      {/* Levá strana - Title a Description */}
      <div className="space-y-4">
        <Title as="h2" className="text-3xl md:text-4xl lg:text-5xl">
          {questionsSection.Title}
        </Title>
        {questionsSection.Description && (
          <p className="text-neutral-600">{questionsSection.Description}</p>
        )}
      </div>

      {/* Pravá strana - Accordion */}
      <div className="border-t border-b border-neutral-200">
        <Accordion type="single" collapsible className="w-full">
          {questionsSection.Question.map((item, index) => (
            <AccordionItem
              key={item.id}
              value={`item-${item.id}`}
              className="border-b border-neutral-200 last:border-b-0"
            >
              <AccordionTrigger className="rounded-none text-left hover:no-underline py-6 [&>svg]:w-6 [&>svg]:h-6 cursor-pointer">
                <div className="flex gap-4 items-start w-full">
                  <Title
                    as="h4"
                    className="text-golden-gate font-bold text-xl shrink-0"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </Title>
                  <Title as="h4" className="text-left flex-1">
                    {item.Question}
                  </Title>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div>
                  <div className="w-[28px] shrink-0"></div>
                  <div className="text-base text-neutral-600 flex-1">
                    {renderRichText(item.Answer)}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
