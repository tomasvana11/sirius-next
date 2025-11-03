/*
// components/FeaturedSiriusCast/FeaturedSiriusCast.tsx
import React from "react";
import Image from "next/image";
import { Title } from "@/components/Title";
import { ButtonLink } from "@/components/ButtonLink";
import { SiriusCastList } from "@/components/SiriusCastList";
import { getSiriusCastBanner } from "@/lib/strapi";
import type { FeaturedSiriusCastProps } from "./FeaturedSiriusCast.types";

export const FeaturedSiriusCast = async ({
  className,
}: FeaturedSiriusCastProps) => {
  const banner = await getSiriusCastBanner();

  if (!banner) {
    return null;
  }

  return (
    <section className={className}>
      <div className="relative rounded-xl overflow-hidden py-6 px-4 lg:py-8 lg:px-8">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/podcast-bg.png"
            alt="Podcast background"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>

        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(234, 62, 26, 1) 20%, rgba(234, 62, 26, 0.1) 120%)",
          }}
        />

        <div className="relative z-10 space-y-6 lg:space-y-8">
          <div className="max-w-3xl">
            <Title as="h3" className="text-white mb-4">
              {banner.Title}
            </Title>
            <p className="text-white/90 text-base lg:text-lg">
              {banner.Description}
            </p>
          </div>

          <SiriusCastList limit={4} />

          <div className="flex flex-col sm:flex-row gap-4 pt-4 items-center">
            <ButtonLink
              href={banner.spotifyLink}
              variant="primary"
              theme="light2"
              target="_blank"
              rel="noopener noreferrer"
            >
              SIRIUScast na Spotify
            </ButtonLink>

            <ButtonLink
              href={banner.youtubeLink}
              variant="secondary"
              theme="white"
              target="_blank"
              rel="noopener noreferrer"
            >
              SIRIUScast na YouTube
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
};
*/

// components/FeaturedSiriusCast/FeaturedSiriusCast.tsx
import React from "react";
import Image from "next/image";
import { Title } from "@/components/Title";
import { ButtonLink } from "@/components/ButtonLink";
import { SiriusCastList } from "@/components/SiriusCastList";
import { getSiriusCastBanner, getSiriusCasts } from "@/lib/strapi";
import type { FeaturedSiriusCastProps } from "./FeaturedSiriusCast.types";

export const FeaturedSiriusCast = async ({
  className,
}: FeaturedSiriusCastProps) => {
  const banner = await getSiriusCastBanner();
  const casts = await getSiriusCasts("all"); // nebo limit podle potřeby

  if (!banner) {
    return null;
  }

  return (
    <section className={className}>
      {/* Banner sekce s pozadím */}
      <div className="relative rounded-xl overflow-hidden py-6 px-4 lg:py-8 lg:px-8">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/podcast-bg.png"
            alt="Podcast background"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(234, 62, 26, 1) 20%, rgba(234, 62, 26, 0.1) 120%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 space-y-6 lg:space-y-8">
          {/* Title a Description */}
          <div className="max-w-3xl">
            <Title as="h3" className="text-white mb-4">
              {banner.Title}
            </Title>
            <p className="text-white/90 text-base lg:text-lg">
              {banner.Description}
            </p>
          </div>

          {/* Grid s epizodami - nyní s sliderem */}
          {casts && casts.length > 0 && <SiriusCastList casts={casts} />}

          {/* Tlačítka */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 items-center">
            <ButtonLink
              href={banner.spotifyLink}
              variant="primary"
              theme="light2"
              target="_blank"
              rel="noopener noreferrer"
            >
              SIRIUScast na Spotify
            </ButtonLink>
            <ButtonLink
              href={banner.youtubeLink}
              variant="secondary"
              theme="white"
              target="_blank"
              rel="noopener noreferrer"
            >
              SIRIUScast na YouTube
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
};
