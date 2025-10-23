/*
// components/Hero/Hero.types.ts
export interface HeroProps {
  title: string;
  description?: string | null;
  backgroundImage: string;
  buttonText?: string | null;
  buttonUrl?: string | null;
  buttonPage?: string | null;
  buttonIsExternal?: boolean;
  type?: 'default' | 'hero';
}
*/

// components/Hero/Hero.types.ts
import type { StrapiImage } from "@/lib/strapi/types";

export interface HeroProps {
  title: string;
  description?: string | null;
  heroImage?: StrapiImage | null;
  buttonText?: string | null;
  buttonUrl?: string | null;
  buttonPage?: string | null;
  buttonIsExternal?: boolean;
  type?: 'default' | 'hero';
}