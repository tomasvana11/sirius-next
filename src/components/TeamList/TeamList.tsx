"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Title } from "@/components/Title";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/lib/strapi/types";

interface TeamListProps {
  teamMembers: TeamMember[];
  className?: string;
}

export const TeamList = ({ teamMembers, className }: TeamListProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(5);
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      setIsSmallMobile(width < 375);

      if (width >= 1024) {
        setItemsPerSlide(5);
      } else if (width >= 768) {
        setItemsPerSlide(3);
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

  if (!teamMembers || teamMembers.length === 0) {
    return null;
  }

  const sortedMembers = [...teamMembers].sort((a, b) => b.id - a.id);

  const slides: TeamMember[][] = [];
  for (let i = 0; i < sortedMembers.length; i += itemsPerSlide) {
    slides.push(sortedMembers.slice(i, i + itemsPerSlide));
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
              aria-label="Previous team members"
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
              aria-label="Next team members"
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
            {slides.map((slideMembers, slideIndex) => (
              <div
                key={slideIndex}
                className={cn(
                  "min-w-full grid grid-rows-1",
                  isSmallMobile
                    ? "grid-cols-1 gap-3"
                    : "grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6"
                )}
              >
                {slideMembers.map((member) => {
                  const photoUrl = member.Photo?.[0]?.url || null;

                  return (
                    <article key={member.id} className="flex flex-col">
                      <div className="relative w-full aspect-square bg-neutral-200 rounded-xl overflow-hidden mb-3">
                        {photoUrl ? (
                          <Image
                            src={photoUrl}
                            alt={
                              member.Photo?.[0]?.alternativeText || member.Name
                            }
                            fill
                            className="object-cover"
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

                      <div className="text-left space-y-1">
                        <Title as="h5" className="text-neutral-800">
                          {member.Name}
                        </Title>
                        <p className="text-neutral-600">{member.Position}</p>
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
