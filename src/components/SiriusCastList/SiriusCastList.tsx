/*
// components/SiriusCastList/SiriusCastList.tsx
import React from "react";
import Image from "next/image";
import { getSiriusCasts } from "@/lib/strapi";
import { Title } from "@/components/Title";
import { ButtonLink } from "@/components/ButtonLink";
import { cn } from "@/lib/utils";
import type { SiriusCastListProps } from "./SiriusCastList.types";

export const SiriusCastList = async ({
  limit = 4,
  className,
}: SiriusCastListProps) => {
  const casts = await getSiriusCasts(limit);

  if (!casts || casts.length === 0) {
    return null;
  }

  return (
    <section className={cn(className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {casts.map((cast) => {
          const imageUrl = cast.cover?.url;

          return (
            <article
              key={cast.id}
              className="group overflow-hidden h-full flex flex-col"
            >
              <a
                href={cast.spotifyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative w-full aspect-[4/2] bg-neutral-200 rounded-xl overflow-hidden mb-4">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={cast.cover?.alternativeText || cast.Title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image
                        src="/icons/system/img-placeholder.svg"
                        alt="Placeholder"
                        width={64}
                        height={64}
                      />
                    </div>
                  )}
                </div>
              </a>

              <div className="flex flex-col flex-grow space-y-4">
                <a
                  href={cast.spotifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Title
                    as="h4"
                    className="text-white line-clamp-2 underline-offset-4 group-hover:underline transition-all duration-300"
                  >
                    {cast.Title}
                  </Title>
                </a>

                <div className="mt-auto">
                  <ButtonLink
                    href={cast.spotifyLink}
                    variant="secondary"
                    theme="white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Poslechnout epizodu
                  </ButtonLink>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
*/

// components/SiriusCastList/SiriusCastList.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Title } from "@/components/Title";
import { ButtonLink } from "@/components/ButtonLink";
import { cn } from "@/lib/utils";
import type { SiriusCast } from "@/lib/strapi/types";

interface SiriusCastListProps {
  casts: SiriusCast[];
  className?: string;
}

export const SiriusCastList = ({ casts, className }: SiriusCastListProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!casts || casts.length === 0) {
    return null;
  }

  // Seřadit podle ID sestupně (od nejvyššího k nejnižšímu)
  const sortedCasts = [...casts].sort((a, b) => b.id - a.id);

  // Počet viditelných položek podle breakpointu
  const itemsPerSlide = 4;

  // Rozdělení seřazených epizod do slidů
  const slides = [];
  for (let i = 0; i < sortedCasts.length; i += itemsPerSlide) {
    slides.push(sortedCasts.slice(i, i + itemsPerSlide));
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

  return (
    <section className={cn("relative", className)}>
      <div className="relative px-12">
        {showNavigation && (
          <>
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 z-10",
                "w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm",
                "flex items-center justify-center transition-colors duration-300",
                "hover:bg-white/30 cursor-pointer",
                "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/20",
                "border-0 outline-none focus:outline-none"
              )}
              aria-label="Previous episodes"
            >
              <Image
                src="/icons/system/left.svg"
                alt="Previous"
                width={24}
                height={24}
                className="brightness-0 invert"
              />
            </button>

            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 z-10",
                "w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm",
                "flex items-center justify-center transition-colors duration-300",
                "hover:bg-white/30 cursor-pointer",
                "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/20",
                "border-0 outline-none focus:outline-none"
              )}
              aria-label="Next episodes"
            >
              <Image
                src="/icons/system/right.svg"
                alt="Next"
                width={24}
                height={24}
                className="brightness-0 invert"
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
            {slides.map((slideCasts, slideIndex) => (
              <div
                key={slideIndex}
                className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {slideCasts.map((cast) => {
                  const imageUrl = cast.cover?.url;

                  return (
                    <article
                      key={cast.id}
                      className="group overflow-hidden h-full flex flex-col"
                    >
                      <a
                        href={cast.spotifyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <div className="relative w-full aspect-[4/2] bg-neutral-200 rounded-xl overflow-hidden mb-4">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={cast.cover?.alternativeText || cast.Title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Image
                                src="/icons/system/img-placeholder.svg"
                                alt="Placeholder"
                                width={64}
                                height={64}
                              />
                            </div>
                          )}
                        </div>
                      </a>

                      <div className="flex flex-col flex-grow space-y-4">
                        <a
                          href={cast.spotifyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Title
                            as="h4"
                            className="text-white line-clamp-2 underline-offset-4 group-hover:underline transition-all duration-300"
                          >
                            {cast.Title}
                          </Title>
                        </a>

                        <div className="mt-auto">
                          <ButtonLink
                            href={cast.spotifyLink}
                            variant="secondary"
                            theme="white"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Poslechnout epizodu
                          </ButtonLink>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

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
                  isActive ? "bg-white w-6" : "bg-white/40 w-2"
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
