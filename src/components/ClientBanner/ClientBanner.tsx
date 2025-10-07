import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Title } from "@/components/Title";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

interface ClientBannerProps {
  className?: string;
}

export const ClientBanner: React.FC<ClientBannerProps> = ({ className }) => {
  // Hardcoded banner data
  const banner = {
    Title:
      "Chcete i vy být jednimi z klientů, kterým jsme pomohli změnit životy?",
    Description:
      "Lorem ipsum dolor sit amet consectetur. Nunc euismod congue risus sodales suspendisse tincidunt. Amet sit diam leo tortor consectetur elementum. Potenti volutpat nec eget congue ut in suspendisse ultrices.",
    Url: "/spoluprace",
  };

  return (
    <div>
      <div
        className={cn(
          "relative overflow-hidden rounded-xl px-4 py-6 lg:px-8 lg:py-8",
          className
        )}
      >
        {/* Obrázek na pozadí */}
        <div className="absolute inset-0 left-[25%]">
          <Image
            src="/img/reference-bg.png"
            alt="Onboarding background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--golden-gate) 0%, var(--golden-gate) 25%, transparent 125%)",
          }}
        />

        {/* Obsah */}
        <div className="relative z-10 h-full flex flex-col justify-center max-w-full md:max-w-[50%] xl:max-w-[40%]">
          <Title as="h3" className="text-white mb-3 lg:mb-5">
            {banner.Title}
          </Title>
          <p className="text-white/80 text-base mb-6 lg:mb-8 font-nunito whitespace-pre-line">
            {banner.Description}
          </p>
          {banner.Url && (
            <div>
              <Link href={banner.Url}>
                <Button variant="primary" theme="light2">
                  Chci se stát klientem
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
