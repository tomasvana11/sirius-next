"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Partner } from "@/lib/strapi/types";

interface PartnersListProps {
  partners: Partner[];
  className?: string;
}

export const PartnersList = ({ partners, className }: PartnersListProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(6);
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      setIsSmallMobile(width < 375);

      if (width >= 1024) {
        setItemsPerSlide(6);
      } else if (width >= 768) {
        setItemsPerSlide(4);
      } else if (width < 375) {
        setItemsPerSlide(1);
      } else {
        setItemsPerSlide(2);
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  if (!partners || partners.length === 0) {
    return null;
  }

  const slides: Partner[][] = [];
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

  const showNavigation = totalSlides > 1;

  const getVisibleDots = () => {
    if (!isSmallMobile || totalSlides <= 5) {
      return slides.map((_, index) => index);
    }

    const visibleIndices = new Set<number>();
    visibleIndices.add(0);
    visibleIndices.add(totalSlides - 1);

    for (
      let i = Math.max(0, currentSlide - 2);
      i <= Math.min(totalSlides - 1, currentSlide + 2);
      i++
    ) {
      visibleIndices.add(i);
    }

    return Array.from(visibleIndices).sort((a, b) => a - b);
  };

  const visibleDotIndices = getVisibleDots();

  return (
    <section className={cn("relative", className)}>
      <div className={cn("relative", "pl-14 pr-14 md:pl-16 md:pr-16")}>
        {showNavigation && (
          <>
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 z-10",
                "rounded-full bg-neutral-100",
                "flex items-center justify-center transition-colors duration-300",
                "hover:bg-neutral-200 cursor-pointer",
                "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-neutral-100",
                "border-0 outline-none focus:outline-none",
                "w-10 h-10 md:w-12 md:h-12"
              )}
              aria-label="Previous partners"
            >
              <Image
                src="/icons/system/left.svg"
                alt="Previous"
                width={18}
                height={18}
                className="md:w-6 md:h-6"
              />
            </button>

            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 z-10",
                "rounded-full bg-neutral-100",
                "flex items-center justify-center transition-colors duration-300",
                "hover:bg-neutral-200 cursor-pointer",
                "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-neutral-100",
                "border-0 outline-none focus:outline-none",
                "w-10 h-10 md:w-12 md:h-12"
              )}
              aria-label="Next partners"
            >
              <Image
                src="/icons/system/right.svg"
                alt="Next"
                width={18}
                height={18}
                className="md:w-6 md:h-6"
              />
            </button>
          </>
        )}

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
                className={cn(
                  "min-w-full grid grid-rows-1",
                  isSmallMobile
                    ? "grid-cols-1 gap-3"
                    : "grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6"
                )}
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

      {showNavigation && (
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          {isSmallMobile && totalSlides > 5
            ? visibleDotIndices.map((index) => {
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
              })
            : slides.map((_, index) => {
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
