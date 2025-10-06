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
      {/* Desktop: 5 sloupců, Tablet: 3 sloupce, Mobile: 2 sloupce */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {teamMembers.map((member) => {
          const photoUrl = member.Photo?.[0]?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${member.Photo[0].url}`
            : null;

          return (
            <article key={member.id} className="flex flex-col">
              {/* Foto - poměr 1:1 */}
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

              {/* Jméno a pozice - zarovnané doleva */}
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
