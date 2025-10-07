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
  const personImageUrl = appAdvantagesData.personImage?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${appAdvantagesData.personImage.url}`
    : null;

  const appScreenshotUrl = appBlockData.appScreenshot?.[0]?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${appBlockData.appScreenshot[0].url}`
    : null;

  return (
    <section className="bg-gradient-to-r from-golden-gate/10 to-transparent">
      <ContentWrapper>
        {/* Title */}
        <div className="pt-8 lg:pt-14 mb-8 lg:mb-12">
          <Title as="h2" className="text-4xl lg:text-5xl text-left">
            <span className="text-neutral-800">
              Mějte své finance vždy pod kontrolou.
            </span>
            <br />
            <span className="text-[#EC4C19]">Kdykoli. Kdekoli.</span>
          </Title>
        </div>

        {/* Desktop layout (lg a větší) */}
        <div className="hidden lg:grid grid-cols-12 gap-6 items-end">
          {/* Levá strana - Person Image */}
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

          {/* Wrapper pro Střed a Pravou stranu */}
          <div className="col-span-8 grid grid-cols-3 gap-6 pb-8 lg:pb-14">
            {/* Střed - App Block */}
            <div className="col-span-2">
              <div className="bg-gradient-to-b from-[#8F2E0F] to-[#5E2607] rounded-xl text-white h-full relative overflow-hidden">
                {/* Phone screenshot - positioned absolutely */}
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

                {/* Wrapper pro title a features s automatickou mezerou */}
                <div className="h-full flex flex-col justify-between py-8 pr-8">
                  {/* Title nahoře */}
                  <Title
                    as="h3"
                    className="text-white text-2xl lg:text-3xl pl-8"
                  >
                    {appBlockData.Title}
                  </Title>

                  {/* Features list dole */}
                  <div className="relative space-y-3">
                    {appBlockData.appFeatures?.map((feature) => (
                      <div
                        key={feature.id}
                        className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-r-full py-4 pl-8 pr-4 max-w-[280px]"
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
              </div>
            </div>

            {/* Pravá strana - Reason Cards */}
            <div className="flex flex-col gap-6 h-full">
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
                      <Icon
                        name={reason.icon.Icon.trim()}
                        size="M"
                        className="text-white"
                      />
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
            </div>
          </div>
        </div>

        {/* Tablet a Mobile layout (menší než lg) */}
        <div className="lg:hidden pb-8 lg:pb-14 space-y-6">
          {/* App Block - celá šířka */}
          <div className="bg-gradient-to-b from-[#8F2E0F] to-[#5E2607] rounded-xl text-white relative overflow-hidden">
            {/* Phone screenshot - positioned absolutely */}
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

            {/* Wrapper pro title a features s automatickou mezerou */}
            <div className="flex flex-col justify-between py-8 pr-8 min-h-[400px]">
              {/* Title nahoře */}
              <Title as="h3" className="text-white text-2xl lg:text-3xl pl-8">
                {appBlockData.Title}
              </Title>

              {/* Features list dole */}
              <div className="relative space-y-3">
                {appBlockData.appFeatures?.map((feature) => (
                  <div
                    key={feature.id}
                    className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-r-full py-4 pl-8 pr-4 max-w-[280px]"
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
          </div>

          {/* Reason Cards - vedle sebe na tabletu, pod sebou na mobilu */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasonCardsData?.map((reason, index) => (
              <div key={reason.id} className="bg-neutral-100 rounded-xl p-6">
                <div
                  className={`flex items-center gap-4 mb-4 ${
                    index % 2 === 1 ? "flex-row-reverse" : ""
                  }`}
                >
                  <div className="w-12 h-12 bg-[#EC4C19] rounded-full flex items-center justify-center shrink-0">
                    <Icon
                      name={reason.icon.Icon.trim()}
                      size="M"
                      className="text-white"
                    />
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
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
};
