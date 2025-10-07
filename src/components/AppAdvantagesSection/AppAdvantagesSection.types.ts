import type { Homepage } from "@/lib/strapi";

export interface AppAdvantagesSectionProps {
    appAdvantagesData: Homepage["appAdvantages"];
    appBlockData: Homepage["appBlock"];
    reasonCardsData?: Homepage["reasonCards"];
  }