// components/Hero/Hero.types.ts
export interface HeroProps {
    title: string;
    description?: string | null;
    backgroundImage: string;
    buttonText?: string | null;
    buttonUrl?: string | null;
    buttonIsExternal?: boolean;
  }