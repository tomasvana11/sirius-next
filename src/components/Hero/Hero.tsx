// components/Hero/Hero.tsx
import React from "react";
import Image from "next/image";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Title } from "@/components/Title";
import { ButtonLink } from "@/components/ButtonLink";
import type { HeroProps } from "./Hero.types";

export const Hero: React.FC<HeroProps> = ({
  title,
  description,
  backgroundImage,
  buttonText,
  buttonUrl,
  buttonIsExternal = false,
}) => {
  const showButton = buttonText && buttonUrl;

  return (
    <section className="relative py-40 flex items-center">
      {/* Background Image */}
      <Image
        src={`/img/${backgroundImage}`}
        alt={title}
        fill
        className="object-cover"
        priority
        quality={90}
      />

      {/* Gradient Overlay - černá zleva do průhledné zprava */}
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />

      {/* Content */}
      <ContentWrapper className="relative z-10 items-start">
        <div className="w-full text-white space-y-6">
          <Title as="h1">{title}</Title>

          {showButton && (
            <div className="pt-4">
              <ButtonLink href={buttonUrl} variant="primary">
                {buttonText}
              </ButtonLink>
            </div>
          )}
        </div>
        {description && <p className="mt-6 text-white/80">{description}</p>}
      </ContentWrapper>
    </section>
  );
};
