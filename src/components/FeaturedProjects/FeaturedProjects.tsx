import React from "react";
import { Title } from "@/components/Title";
import { ButtonLink } from "@/components/ButtonLink";
import { ProjectsList } from "../ProjectsList";

export const FeaturedProjects = () => {
  return (
    <section className="space-y-6 lg:space-y-8 pt-8 pb-4 lg:pt-14 lg:pb-8">
      <div className="text-center space-y-4 justify-start">
        <Title as="h3">
          „Tvoříme silnou značku. Ale svůj příběh píšete vy.“
        </Title>
        <p className="text-base text-neutral-600">
          Naši poradci nejsou jen součástí týmu. Jsou to samostatní podnikatelé,
          kteří budují vlastní značky, vedou vlastní projekty a tvoří svou
          cestu.
          <br />
          SIRIUS FINANCE jim v tom dává zázemí, know-how a svobodu růst bez
          limitů.
        </p>
      </div>
      <ProjectsList limit={4} />
    </section>
  );
};
