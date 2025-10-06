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
