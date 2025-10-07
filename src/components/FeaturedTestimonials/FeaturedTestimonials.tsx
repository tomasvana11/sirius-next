import React from "react";
import { getTextReferences } from "@/lib/strapi";
import { Title } from "@/components/Title";
import { ButtonLink } from "@/components/ButtonLink";
import { TestimonialCard } from "@/components/TestimonialCard";

export const FeaturedTestimonials = async () => {
  const allReferences = await getTextReferences("all");

  // První 3 reference
  const firstThree = allReferences.slice(0, 3);

  return (
    <section className="space-y-6 lg:space-y-8 pt-8 lg:pt-14">
      <div className="flex justify-start lg:justify-between">
        <Title as="h3">
          Slova našich klientů potvrzují naši profesionalitu
        </Title>
        <ButtonLink
          href="/reference"
          variant="primary"
          theme="dark"
          className="hidden lg:flex"
        >
          Chci slyšet i další názory
        </ButtonLink>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {firstThree.map((reference) => (
          <TestimonialCard
            key={reference.id}
            review={reference.Review}
            name={reference.Name}
            yearsBeingClient={reference.yearsBeingClient}
          />
        ))}
      </div>
      <ButtonLink
        href="/reference"
        variant="primary"
        theme="dark"
        className="lg:hidden"
      >
        Chci slyšet i další názory
      </ButtonLink>
    </section>
  );
};
