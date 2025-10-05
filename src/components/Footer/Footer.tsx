// components/Footer/Footer.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getSocialMedia } from "@/lib/strapi";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Separator } from "@/components/ui/separator";
import type { SocialMediaPlatform } from "@/lib/strapi";

const getSocialIcon = (platform: SocialMediaPlatform): string => {
  const iconMap: Record<SocialMediaPlatform, string> = {
    facebook: "/social-media-icons/facebook.svg",
    instagram: "/social-media-icons/instagram.svg",
    linkedin: "/social-media-icons/linkedin.svg",
    youtube: "/social-media-icons/youtube.svg",
    other: "/social-media-icons/other-media.svg",
  };

  return iconMap[platform];
};

export const Footer = async () => {
  const socialMedia = await getSocialMedia();

  // Debug - vypiš data do konzole
  console.log("Social Media Data:", JSON.stringify(socialMedia, null, 2));

  return (
    <footer>
      <ContentWrapper>
        <div className="flex items-center justify-between gap-6 py-5">
          <Image src="/logo_sirius.svg" alt="Logo" width={50} height={50} />

          <div className="flex items-center justify-center gap-3">
            {socialMedia?.socialMediaLinks.map((link) => {
              const iconSrc = getSocialIcon(link.Platform);
              console.log(`Platform: ${link.Platform}, Icon: ${iconSrc}`);

              return (
                <a
                  key={link.id}
                  href={link.Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity w-11 h-11 rounded-full bg-neutral-200 flex items-center justify-center"
                  aria-label={link.Platform}
                >
                  <Image
                    src={iconSrc}
                    alt={`${link.Platform} icon`}
                    width={36}
                    height={36}
                  />
                </a>
              );
            })}
          </div>
        </div>
        <Separator />
        <div className="hidden lg:block">
          <div className="flex py-5 justify-center gap-4">
            <Link
              href="/zpracovani-osobnich-udaju"
              className="text-neutral-500 hover:text-neutral-700 text-sm transition-colors underline"
            >
              Zpracování osobních údajů
            </Link>
            <div className="h-6">
              <Separator orientation="vertical" className="bg-neutral-300" />
            </div>
            <Link
              href="/cookies"
              className="text-neutral-500 hover:text-neutral-700 text-sm transition-colors underline"
            >
              Cookies
            </Link>
            <div className="h-6">
              <Separator orientation="vertical" className="bg-neutral-300" />
            </div>
            <Link
              href="/whistleblowing"
              className="text-neutral-500 hover:text-neutral-700 text-sm transition-colors underline"
            >
              Whistleblowing
            </Link>
            <div className="h-6">
              <Separator orientation="vertical" className="bg-neutral-300" />
            </div>
            <Link
              href="/sitemap.xml"
              className="text-neutral-500 hover:text-neutral-700 text-sm transition-colors underline"
            >
              Mapa stránek
            </Link>
          </div>
          <Separator />
        </div>
        <div className="text-center text-sm text-neutral-500 py-5 space-y-2">
          <p>
            SIRIUS FINANCE, a. s., Jankovcova 1569/2c, 170 00 Praha 7 –
            Holešovice, IČ: 05551421, DIČ: CZ05551421, Právní forma: akciová
            společnost, Základní kapitál: 2 000 000 Kč. Společnost je zapsána do
            obchodního rejstříku vedeného Městským soudem v Praze, sp. zn.: B
            21988
          </p>
          <p>
            © {new Date().getFullYear()} Sirius Finance, a. s. - všechna práva
            vyhrazena
          </p>
        </div>
      </ContentWrapper>
    </footer>
  );
};
