/*
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
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {partners.map((partner) => {
          const logoUrl = partner.Logo?.[0]?.url ?? null;

          return (
            <div
              key={partner.id}
              className="flex items-center justify-center bg-white border-2 border-neutral-200 rounded-xl p-6 aspect-[4/3]"
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
                <Image
                  src="/icons/system/img-placeholder.svg"
                  alt="Placeholder"
                  width={64}
                  height={64}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
*/ // components/PartnersList/PartnersList.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Partner } from "@/lib/strapi/types";

interface PartnersListProps {
  partners: Partner[];
  className?: string;
}

export const PartnersList = ({ partners, className }: PartnersListProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!partners || partners.length === 0) {
    return null;
  }

  // Počet viditelných položek podle breakpointu
  const itemsPerSlide = 6; // Na desktopu 6, pak pomocí responsive grid 4 a 3

  // Rozdělení partnerů do slidů
  const slides = [];
  for (let i = 0; i < partners.length; i += itemsPerSlide) {
    slides.push(partners.slice(i, i + itemsPerSlide));
  }

  const totalSlides = slides.length;

  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(totalSlides - 1, prev + 1));
  };

  const canGoPrev = currentSlide > 0;
  const canGoNext = currentSlide < totalSlides - 1;

  // Pokud je jen jeden slide, nezobrazujeme navigaci
  const showNavigation = totalSlides > 1;

  return (
    <section className={cn("relative", className)}>
      <div className="relative px-12">
        {/* Navigation Buttons */}
        {showNavigation && (
          <>
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 z-10",
                "w-12 h-12 rounded-full bg-neutral-100",
                "flex items-center justify-center transition-colors duration-300",
                "hover:bg-neutral-200 cursor-pointer",
                "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-neutral-100",
                "border-0 outline-none focus:outline-none"
              )}
              aria-label="Previous partners"
            >
              <Image
                src="/icons/system/left.svg"
                alt="Previous"
                width={24}
                height={24}
              />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 z-10",
                "w-12 h-12 rounded-full bg-neutral-100",
                "flex items-center justify-center transition-colors duration-300",
                "hover:bg-neutral-200 cursor-pointer",
                "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-neutral-100",
                "border-0 outline-none focus:outline-none"
              )}
              aria-label="Next partners"
            >
              <Image
                src="/icons/system/right.svg"
                alt="Next"
                width={24}
                height={24}
              />
            </button>
          </>
        )}

        {/* Slider Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {slides.map((slidePartners, slideIndex) => (
              <div
                key={slideIndex}
                className="min-w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
              >
                {slidePartners.map((partner) => {
                  const logoUrl = partner.Logo?.[0]?.url ?? null;

                  return (
                    <div
                      key={partner.id}
                      className="flex items-center justify-center bg-white border-2 border-neutral-200 rounded-xl p-6 aspect-[4/3]"
                    >
                      {logoUrl ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={logoUrl}
                            alt={
                              partner.Logo?.[0]?.alternativeText ||
                              partner.Title
                            }
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <Image
                          src="/icons/system/img-placeholder.svg"
                          alt="Placeholder"
                          width={64}
                          height={64}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      {showNavigation && (
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, index) => {
            const isActive = currentSlide === index;

            return (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 cursor-pointer border-0 outline-none focus:outline-none",
                  isActive ? "bg-[#EC4C19] w-6" : "bg-neutral-300 w-2"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};
