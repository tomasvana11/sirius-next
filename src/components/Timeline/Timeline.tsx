// components/Timeline/Timeline.tsx
import React from "react";
import Image from "next/image";
import Icon from "@/components/Icon";
import { TimelineProps } from "./Timeline.types";
import { ContentWrapper } from "@/components/ContentWrapper";

export function Timeline({
  BackgroundImage,
  Title,
  Description,
  Tags,
  Steps,
}: TimelineProps) {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={BackgroundImage.url}
          alt={BackgroundImage.alternativeText || ""}
          fill
          className="object-cover"
          priority
        />
        {/* Orange Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#EC4C19] to-[#EC4C19]/80" />
      </div>

      {/* Content */}
      <ContentWrapper className="relative z-10 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Panel - Orange Section */}
          <div className="lg:w-5/12 text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 [font-family:var(--font-nunito)]">
              {Title}
            </h1>
            <p className="text-base lg:text-lg mb-8 lg:mb-12 leading-relaxed">
              {Description}
            </p>

            {/* Tags */}
            <div className="space-y-4">
              {Tags.map((tag) => (
                <div
                  key={tag.id}
                  className="bg-black/20 backdrop-blur-sm rounded-lg p-4 flex items-start gap-4"
                >
                  <div className="w-14 h-14 bg-[#EC4C19] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={tag.Icon} size="M" className="text-white" />
                  </div>
                  <p className="text-sm lg:text-base leading-relaxed pt-2">
                    {tag.Label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - White Card with Steps */}
          <div className="lg:w-7/12">
            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-2xl">
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-[19px] top-[60px] bottom-0 w-px bg-neutral-200" />

                {/* Steps */}
                <div className="space-y-8">
                  {Steps.map((step, index) => (
                    <div key={step.id} className="relative flex gap-6">
                      {/* Icon Circle */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-10 h-10 bg-[#EC4C19] rounded-full flex items-center justify-center">
                          <Icon
                            name={step.Icon}
                            size="S"
                            className="text-white"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-1">
                        <h3 className="text-xl lg:text-2xl font-bold mb-3 [font-family:var(--font-nunito)] [font-weight:700]">
                          {step.Title}
                        </h3>
                        <p className="text-neutral-600 text-sm lg:text-base leading-relaxed">
                          {step.Description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}
