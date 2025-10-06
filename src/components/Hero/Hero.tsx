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
  buttonPage,
  buttonIsExternal,
  type = "default",
}) => {
  const createSlug = (text: string): string => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  let finalButtonUrl: string | null = null;
  if (buttonIsExternal === true && buttonUrl) {
    finalButtonUrl = buttonUrl;
  } else if (buttonIsExternal === false && buttonPage) {
    if (buttonPage.toLowerCase() === "homepage") {
      finalButtonUrl = "/";
    } else {
      finalButtonUrl = `/${createSlug(buttonPage)}`;
    }
  }

  const showButton = buttonText && finalButtonUrl;

  return (
    <section className="relative py-20 flex items-center">
      {/* Background Image */}
      <Image
        src={`/img/${backgroundImage}`}
        alt={title}
        fill
        className="object-cover"
        priority
        quality={90}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-golden-gate/05 lg:hidden" />

      {/* Content */}
      <ContentWrapper className="relative z-10 items-start">
        <div
          className={`w-full text-white space-y-6 md:space-y-8 ${
            type === "hero" ? "max-w-lg" : "max-w-[1000px]"
          }`}
        >
          <Title as="h1" className="leading-tight">
            {title}
          </Title>

          {/* Default: description pod title */}
          {type === "default" && description && (
            <p className="text-white max-w-lg">{description}</p>
          )}

          {showButton && finalButtonUrl && (
            <ButtonLink
              href={finalButtonUrl}
              variant="primary"
              className="mt-3 md:mt-4"
            >
              {buttonText}
            </ButtonLink>
          )}
        </div>

        {/* Hero type: hvězdičky a description níže */}
        {type === "hero" && description && (
          <>
            <div className="flex items-center gap-3 pt-12">
              <Image
                src="/icons/system/stars.svg"
                alt={title}
                width={160}
                height={32}
                className="object-cover w-auto h-7 md:h-8"
                priority
                quality={90}
              />
              <Title as="h6" className="text-white max-w-xs text-md md:text-lg">
                4.8 / 5
              </Title>
            </div>
            <Title as="h6" className="pt-4 text-white max-w-xs !text-base">
              {description}
            </Title>
          </>
        )}
      </ContentWrapper>
    </section>
  );
};
