// components/SiriusCastList/SiriusCastList.tsx
import React from "react";
import Link from "next/link";
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
