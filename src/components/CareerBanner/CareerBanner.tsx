import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCareerBanner } from "@/lib/strapi";
import { Title } from "@/components/Title";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

interface CareerBannerComponentProps {
  className?: string;
}

export const CareerBanner = async ({
  className,
}: CareerBannerComponentProps) => {
  const banner = await getCareerBanner();
  if (!banner) return null;

  // Vezme první link z pole (pokud existuje)
  const link = banner.bannerLink?.[0];

  return (
    <div>
      <div
        className={cn(
          "relative overflow-hidden rounded-xl px-4 py-6 lg:px-8 lg:py-8 ",
          className
        )}
      >
        {/* Obrázek na pozadí - začíná na 25% zleva, zabírá 75% */}
        <div className="absolute inset-0 left-[25%]">
          <Image
            src="/img/career-banner-bg.png"
            alt="Career background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Gradient overlay - 100% do 25%, pak fade do 125% (přesahuje vpravo) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--golden-gate) 0%, var(--golden-gate) 25%, transparent 125%)",
          }}
        />

        {/* Obsah */}
        <div className="relative z-10 h-full flex flex-col justify-center max-w-full md:max-w-[50%] xl:max-w-[35%]">
          <Title as="h3" className="text-white mb-3 lg:mb-5">
            {banner.Title}
          </Title>
          <p className="text-white/80 text-base mb-6 lg:mb-8 font-nunito whitespace-pre-line">
            {banner.Description}
          </p>
          {link && (
            <div>
              <Link href={link.Url}>
                <Button variant="primary" theme="light2">
                  Jdu do toho!
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
