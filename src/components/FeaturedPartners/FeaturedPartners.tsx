/*
import React from "react";
import { Title } from "@/components/Title";
import { PartnersList } from "../PartnersList";

export const FeaturedPartners = () => {
  return (
    <section className="space-y-6 lg:space-y-8 pt-8 pb-4 lg:pt-14 lg:pb-8">
      <Title as="h3" className="text-neutral-800 text-center">
        Naši partneři{" "}
      </Title>
      <PartnersList limit="all" />
    </section>
  );
};
*/

// components/FeaturedPartners/FeaturedPartners.tsx
import React from "react";
import { Title } from "@/components/Title";
import { PartnersList } from "../PartnersList";
import { getPartners } from "@/lib/strapi";

export const FeaturedPartners = async () => {
  const partners = await getPartners("all");

  if (!partners || partners.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6 lg:space-y-8 pt-8 pb-4 lg:pt-14 lg:pb-8">
      <Title as="h3" className="text-neutral-800 text-center">
        Naši partneři
      </Title>
      <PartnersList partners={partners} />
    </section>
  );
};
