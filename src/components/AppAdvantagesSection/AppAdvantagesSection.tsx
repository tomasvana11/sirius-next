import React from "react";
import Image from "next/image";
import { Title } from "@/components/Title";
import { ContentWrapper } from "@/components/ContentWrapper";
import type { AppAdvantagesSectionProps } from "./AppAdvantagesSection.types";
import Icon from "@/components/Icon";

export const AppAdvantagesSection: React.FC<AppAdvantagesSectionProps> = ({
  appAdvantagesData,
  appBlockData,
  reasonCardsData,
}) => {
  const personImageUrl = appAdvantagesData.personImage?.url;
  const appScreenshotUrl = appBlockData.appScreenshot?.[0]?.url || null;

  return (
    <section className="bg-gradient-to-r from-golden-gate/10 to-transparent">
      <ContentWrapper>
        <div className="pt-8 lg:pt-10 mb-8 lg:mb-12">
          <Title as="h2" className="text-4xl lg:text-5xl text-left">
            <span className="text-neutral-800">
              Mějte své finance vždy pod kontrolou.
            </span>
            <br />
            <span className="text-[#EC4C19]">Kdykoli. Kdekoli.</span>
          </Title>
        </div>

        <div className="hidden lg:grid grid-cols-12 gap-6 items-end">
          <div className="col-span-4">
            {personImageUrl && (
              <Image
                src={personImageUrl}
                alt="Person"
                width={500}
                height={550}
                className="w-full h-auto"
              />
            )}
          </div>

          <div className="col-span-8 grid grid-cols-3 gap-6 pb-8 lg:pb-14">
            <div className="col-span-2">
              <div className="bg-gradient-to-b from-[#8F2E0F] to-[#5E2607] rounded-xl text-white h-full relative overflow-hidden">
                {appScreenshotUrl && (
                  <div className="absolute right-5 top-24 w-1/2 max-w-[260px]">
                    <Image
                      src={appScreenshotUrl}
                      alt="App Screenshot"
                      width={260}
                      height={520}
                      className="w-full h-auto"
                    />
                  </div>
                )}

                <div className="h-full flex flex-col justify-between py-8 pr-8">
                  <Title
                    as="h3"
                    className="text-white text-2xl lg:text-3xl pl-8"
                  >
                    {appBlockData.Title}
                  </Title>

                  <div className="relative space-y-3">
                    {appBlockData.appFeatures?.map((feature) => (
                      <div
                        key={feature.id}
                        className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-r-full p-4 max-w-[280px]"
                      >
                        <Image
                          src="/icons/system/check.svg"
                          alt="Check"
                          width={24}
                          height={24}
                          className="shrink-0"
                        />
                        <span className="text-neutral-800 text-base font-medium leading-tight">
                          {feature.appFeature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/*<div className="flex flex-col gap-6 h-full">
              {reasonCardsData?.map((reason, index) => (
                <div
                  key={reason.id}
                  className="bg-neutral-100 rounded-xl p-6 flex-1"
                >
                  <div
                    className={`flex items-center gap-4 mb-4 ${
                      index % 2 === 1 ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div className="w-12 h-12 bg-[#EC4C19] rounded-full flex items-center justify-center shrink-0">
                      <Icon name={reason.icon.Icon} size="M" variant="white" />
                    </div>
                    <Title
                      as="h4"
                      className="text-neutral-800 text-lg leading-none"
                    >
                      {reason.Title}
                    </Title>
                  </div>
                  <p className="text-neutral-600">{reason.Description}</p>
                </div>
              ))}
            </div>*/}
            <div className="flex flex-col bg-neutral-100 rounded-xl p-6 gap-6 h-full">
              <Title
                as="h4"
                className="text-neutral-800 text-lg text-center leading-none"
              >
                Stáhněte si naší aplikaci
              </Title>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col items-center gap-3 p-3 rounded-xl bg-golden-gate hover:bg-golden-gate/85 transition-colors duration-200 w-fit mx-auto">
                  <Image
                    src="/img/star_advisor_apple.png"
                    alt="Apple App Store QR"
                    width={128}
                    height={128}
                    className="w-28 h-28 xl:w-32 xl:h-32 rounded-md "
                  />
                  <a
                    href="https://apps.apple.com/cz/app/star-advisor/id6503191460?l=cs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Image
                      src="/img/apple_app_store_button.svg"
                      alt="Apple App Store Button"
                      width={128}
                      height={40}
                      className="w-28 xl:w-32 h-auto"
                    />
                  </a>
                </div>
                <div className="flex flex-col items-center gap-3 p-3 rounded-xl bg-golden-gate hover:bg-golden-gate/85 transition-colors duration-200 w-fit mx-auto">
                  <Image
                    src="/img/star_advisor_google.png"
                    alt="Google Play Store QR"
                    width={128}
                    height={128}
                    className="w-28 h-28 xl:w-32 xl:h-32 rounded-md "
                  />
                  <a
                    href="https://play.google.com/store/apps/details?id=cz.humanit.tibiq.sa2025.app&hl=cs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Image
                      src="/img/google_play_store_button.svg"
                      alt="Google Play Store Button"
                      width={128}
                      height={40}
                      className="w-28 xl:w-32 h-auto"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden pb-8 lg:pb-14 space-y-6">
          <div className="bg-gradient-to-b from-[#8F2E0F] to-[#5E2607] rounded-xl text-white py-8 pr-8">
            <Title as="h3" className="text-white text-2xl mb-6 pl-8">
              {appBlockData.Title}
            </Title>

            <div className="space-y-3">
              {appBlockData.appFeatures?.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-r-full py-4 pl-6"
                >
                  <Image
                    src="/icons/system/check.svg"
                    alt="Check"
                    width={24}
                    height={24}
                    className="shrink-0"
                  />
                  <span className="text-neutral-800 text-base font-medium">
                    {feature.appFeature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sekce s buttony pro mobil - bez QR kódů */}
          <div className="flex flex-col bg-neutral-100 rounded-xl p-6 gap-4">
            <Title
              as="h4"
              className="text-neutral-800 text-lg text-center leading-none"
            >
              Stáhněte si naší aplikaci
            </Title>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://apps.apple.com/cz/app/star-advisor/id6503191460?l=cs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Image
                  src="/img/apple_app_store_button.svg"
                  alt="Apple App Store Button"
                  width={128}
                  height={40}
                  className="w-32 h-auto"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=cz.humanit.tibiq.sa2025.app&hl=cs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Image
                  src="/img/google_play_store_button.svg"
                  alt="Google Play Store Button"
                  width={128}
                  height={40}
                  className="w-32 h-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
};
