// components/ProjectsList/ProjectsList.tsx
import React from "react";
import Image from "next/image";
import { getProjects } from "@/lib/strapi";
import { Title } from "@/components/Title";
import { ButtonLink } from "@/components/ButtonLink";
import { cn } from "@/lib/utils";
import type { ProjectsListProps } from "./ProjectsList.types";

export const ProjectsList = async ({
  limit = 4,
  className,
}: ProjectsListProps) => {
  const projects = await getProjects(limit);

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className={cn(className)}>
      {/* Desktop: 4 sloupce, Tablet: 2 sloupce, Mobile: 1 sloupec */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project) => {
          const coverImageUrl = project.coverImage?.[0]?.url || null;

          const teamMemberPhotoUrl =
            project.clenove_tymu?.Photo?.[0]?.url || null;

          return (
            <article
              key={project.id}
              className="group overflow-hidden h-full flex flex-col"
            >
              {/* Obrázek s členem týmu */}
              <a
                href={project.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative w-full aspect-[4/2] bg-neutral-200 rounded-xl overflow-hidden mb-3">
                  {/* Cover Image */}
                  {coverImageUrl ? (
                    <Image
                      src={coverImageUrl}
                      alt={
                        project.coverImage?.[0]?.alternativeText || project.Name
                      }
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

                  {/* Člen týmu - levý dolní roh */}
                  {project.clenove_tymu && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-3 py-2 p-2">
                      {teamMemberPhotoUrl && (
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={teamMemberPhotoUrl}
                            alt={project.clenove_tymu.Name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <span className="text-sm font-semibold text-neutral-800">
                        {project.clenove_tymu.Name}
                      </span>
                    </div>
                  )}
                </div>
              </a>

              {/* Obsah */}
              <div className="flex flex-col flex-grow space-y-2">
                {/* Titulek */}
                <a
                  href={project.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Title
                    as="h4"
                    className="text-neutral-800 line-clamp-2 underline-offset-4 group-hover:underline transition-all duration-300"
                  >
                    {project.Name}
                  </Title>
                </a>

                {/* Description */}
                <p className="text-neutral-500 text-sm line-clamp-3 flex-grow">
                  {project.Description}
                </p>

                {/* ButtonLink */}
                <div className="pt-2">
                  <ButtonLink
                    href={project.Link}
                    variant="secondary"
                    theme="light"
                  >
                    Více o projektu
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
