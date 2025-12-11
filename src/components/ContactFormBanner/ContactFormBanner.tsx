import React from "react";
import { getFormBanner } from "@/lib/strapi";
import { ContactForm } from "@/components/ContactForm";
import { Title } from "../Title";
import { cn } from "@/lib/utils";
import type { ContactFormBannerProps } from "./ContactFormBanner.types";

export const ContactFormBanner = async ({
  className,
  type,
}: ContactFormBannerProps) => {
  const formBanner =
    type === "kariera"
      ? {
          Title: "Tohle není práce. Tohle může být vaše životní šance.",
          Description:
            "Vyplňte krátký formulář a zjistěte, co všechno vám spolupráce se SIRIUS FINANCE může přinést.",
        }
      : await getFormBanner();

  if (!formBanner) return null;

  return (
    <section
      className={cn(
        "px-4 py-6 lg:py-8 xl:py-12 rounded-xl bg-gradient-to-b from-[#EC4D1A] to-[#EB361C] relative overflow-hidden",
        className
      )}
    >
      <div
        className="absolute bottom-0 -left-60 md:-left-20 w-[150%] md:w-[110%] h-full pointer-events-none"
        style={{
          backgroundImage: "url('/img/contact-banner-pattern.png')",
          backgroundPosition: "bottom left",
          backgroundSize: "100% auto",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative z-10 space-y-6 lg:space-y-8">
        <div className="space-y-4 text-center max-w-md mx-auto">
          <Title as="h3" className="text-white">
            {formBanner.Title}
          </Title>
          <p className="text-white/80">{formBanner.Description}</p>
        </div>
        <ContactForm className="max-w-sm" />
      </div>
    </section>
  );
};
