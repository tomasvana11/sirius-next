import React from "react";
import { Title } from "@/components/Title";
import { ProjectsList } from "../ProjectsList";
import { TeamList } from "../TeamList";

export const FeaturedTeam = () => {
  return (
    <section className="space-y-6 lg:space-y-8 pt-8 pb-4 lg:pt-14 lg:pb-8">
      <div className="text-center space-y-4 justify-start">
        <Title as="h3" className="text-golden-gate">
          Lidé, kteří dávají SIRIU tvář i srdce
        </Title>
        <p className="text-base text-neutral-600">
          Tady jsou ti, kteří z vize udělali realitu. Klíčové osobnosti SIRIUS
          FINANCE, které svou zkušeností, hodnotami a přístupem formují podobu
          firmy dnes i zítra.
        </p>
      </div>
      <TeamList limit="all" />
    </section>
  );
};
