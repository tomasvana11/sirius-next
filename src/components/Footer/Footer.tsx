/*
// components/Footer/Footer.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getSocialMedia, getFooterPages } from "@/lib/strapi";
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
  const footerPages = await getFooterPages();

  return (
    <footer>
      <ContentWrapper>
        <div className="flex items-center justify-between gap-6 py-5">
          <Image src="/logo_sirius.svg" alt="Logo" width={50} height={50} />

          <div className="flex items-center justify-center gap-3">
            {socialMedia?.socialMediaLinks.map((link) => {
              const iconSrc = getSocialIcon(link.Platform);

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

        {footerPages && footerPages.length > 0 && (
          <div className="hidden lg:block">
            <div className="flex py-5 justify-center gap-4 flex-wrap">
              {footerPages.map((page, index) => (
                <React.Fragment key={page.id}>
                  <Link
                    href={`/${page.slug}`}
                    className="text-neutral-500 hover:text-neutral-700 text-sm transition-colors underline"
                  >
                    {page.Title}
                  </Link>
                  {index < footerPages.length - 1 && (
                    <div className="h-6">
                      <Separator
                        orientation="vertical"
                        className="bg-neutral-300"
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}

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
        )}

        <div className="text-center text-sm text-neutral-500 py-5 space-y-2">
          <p>
            SIRIUS FINANCE, a. s., Jankovcova 1569/2c, 170 00 Praha 7 –
            Holešovice, IČ: 05551421, DIČ: CZ05551421, Právní forma: akciová
            společnost, Základní kapitál: 2 000 000 Kč. Společnost je zapsána do
            obchodního rejstříku vedeného Městským soudem v Praze, sp. zn.: B
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
*/

// components/Footer/Footer.tsx
// components/Footer/Footer.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Separator } from "@/components/ui/separator";
import type { SocialMediaPlatform } from "@/lib/strapi";

interface SocialMediaLink {
  id: number;
  Platform: SocialMediaPlatform;
  Url: string;
}

interface SocialMedia {
  socialMediaLinks: SocialMediaLink[];
}

interface FooterPage {
  id: number;
  Title: string;
  slug: string;
}

interface FooterProps {
  socialMedia: SocialMedia | null;
  footerPages: FooterPage[];
}
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

export const Footer: React.FC<FooterProps> = ({ socialMedia, footerPages }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <footer>
      <ContentWrapper>
        <div className="flex items-center justify-between gap-6 py-5">
          <Image src="/logo_sirius.svg" alt="Logo" width={50} height={50} />
          <div className="flex items-center justify-center gap-3">
            {socialMedia?.socialMediaLinks.map((link) => {
              const iconSrc = getSocialIcon(link.Platform);
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

        {footerPages && footerPages.length > 0 && (
          <>
            {/* Desktop verze */}
            <div className="hidden lg:block">
              <div className="flex py-5 justify-center gap-4 flex-wrap">
                {footerPages.map((page, index) => (
                  <React.Fragment key={page.id}>
                    <Link
                      href={`/${page.slug}`}
                      className="text-neutral-500 hover:text-neutral-700 text-sm transition-colors underline"
                    >
                      {page.Title}
                    </Link>
                    {index < footerPages.length - 1 && (
                      <div className="h-6">
                        <Separator
                          orientation="vertical"
                          className="bg-neutral-300"
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
                <div className="h-6">
                  <Separator
                    orientation="vertical"
                    className="bg-neutral-300"
                  />
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

            {/* Mobilní dropdown */}
            <div className="lg:hidden pb-4">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="cursor-pointer w-full flex items-center justify-between py-5 text-neutral-700 hover:text-neutral-900 transition-colors [font-family:var(--font-nunito)] "
              >
                <span className="font-medium">Povinné informace</span>
                <Image
                  src="/icons/system/chevron.svg"
                  alt="Toggle"
                  width={20}
                  height={20}
                  className={`transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isDropdownOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pt-2 pb-4 space-y-3">
                  {footerPages.map((page) => (
                    <Link
                      key={page.id}
                      href={`/${page.slug}`}
                      className="block text-neutral-500 hover:text-neutral-700 text-sm transition-colors underline py-1"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {page.Title}
                    </Link>
                  ))}
                  <Link
                    href="/sitemap.xml"
                    className="block text-neutral-500 hover:text-neutral-700 text-sm transition-colors underline py-1"
                  >
                    Mapa stránek
                  </Link>
                </div>
              </div>
              <Separator />
            </div>
          </>
        )}

        <div className="text-center text-sm text-neutral-500 py-5 space-y-2">
          <p>
            SIRIUS FINANCE, a. s., Jankovcova 1569/2c, 170 00 Praha 7 –
            Holešovice, IČ: 05551421, DIČ: CZ05551421, Právní forma: akciová
            společnost, Základní kapitál: 2 000 000 Kč. Společnost je zapsána do
            obchodního rejstříku vedeného Městským soudem v Praze, sp. zn.: B
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
