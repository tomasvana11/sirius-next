/*
// components/TeamList/TeamList.tsx
import React from "react";
import Image from "next/image";
import { getTeamMembers } from "@/lib/strapi";
import { Title } from "@/components/Title";
import { cn } from "@/lib/utils";
import type { TeamListProps } from "./TeamList.types";

export const TeamList = async ({ limit = "all", className }: TeamListProps) => {
  const teamMembers = await getTeamMembers(limit);

  if (!teamMembers || teamMembers.length === 0) {
    return null;
  }

  return (
    <section className={cn(className)}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {teamMembers.map((member) => {
          const photoUrl = member.Photo?.[0]?.url || null;

          return (
            <article key={member.id} className="flex flex-col">
              <div className="relative w-full aspect-square bg-neutral-200 rounded-xl overflow-hidden mb-3">
                {photoUrl ? (
                  <Image
                    src={photoUrl}
                    alt={member.Photo?.[0]?.alternativeText || member.Name}
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
    </section>
  );
};
*/

// components/TeamList/TeamList.tsx
"use client";

import React, { useState } from "react";
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

  if (!teamMembers || teamMembers.length === 0) {
    return null;
  }

  // Seřadit podle ID sestupně (od nejvyššího k nejnižšímu)
  const sortedMembers = [...teamMembers].sort((a, b) => b.id - a.id);

  // Počet viditelných položek podle breakpointu
  const itemsPerSlide = 5; // Desktop: 5, Tablet: 3, Mobile: 2

  // Rozdělení seřazených členů do slidů
  const slides = [];
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
                "w-12 h-12 rounded-full bg-neutral-100",
                "flex items-center justify-center transition-colors duration-300",
                "hover:bg-neutral-200 cursor-pointer",
                "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-neutral-100",
                "border-0 outline-none focus:outline-none"
              )}
              aria-label="Previous team members"
            >
              <Image
                src="/icons/system/left.svg"
                alt="Previous"
                width={24}
                height={24}
              />
            </button>

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
              aria-label="Next team members"
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
                className="min-w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
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
