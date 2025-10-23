import { getCareerPage } from "@/lib/strapi";
import { ContentWrapper } from "@/components/ContentWrapper";
import { CareerBanner } from "@/components/CareerBanner";
import { FeaturedBlog } from "@/components/FeaturedBlog";
import { ContactFormBanner } from "@/components/ContactFormBanner";
import { Hero } from "@/components/Hero";
import { CareerAccordion } from "@/components/CareerAccordion";
import { FlipCards } from "@/components/FlipCards";
import { Title } from "@/components/Title";
import { Video } from "@/components/Video";
import { OnboardingBanner } from "@/components/OnboardingBanner";
import { IconCard } from "@/components/IconCard";
import { CareerTimeline } from "@/components/CareerTimeline";
import { getCareerTimeline } from "@/lib/fetch/strapi";

export default async function CareerPage() {
  const data = await getCareerPage();
  const careerTimelineData = await getCareerTimeline();

  // Mapování dat pro FlipCards
  const valueCards =
    data.ValuesSection?.Value.map((value) => {
      const imageUrl = value.backgroundImage?.url
        ? value.backgroundImage.url // URL už je kompletní z Digital Ocean Spaces
        : "/icons/system/img-placeholder.svg";

      return {
        id: value.id,
        title: value.Title,
        description: value.Detail,
        image: imageUrl,
      };
    }) || [];

  return (
    <>
      <Hero
        title={data.HeroBanner.Title}
        description={data.HeroBanner.Description}
        heroImage={data.HeroBanner.heroImage}
        buttonText={data.HeroBanner.heroBannerButton?.displayText}
        buttonUrl={data.HeroBanner.heroBannerButton?.Url}
        buttonPage={data.HeroBanner.heroBannerButton?.Page}
        buttonIsExternal={data.HeroBanner.heroBannerButton?.isExternal}
      />
      <ContentWrapper>
        {data.ValuesSection && (
          <FlipCards
            sectionTitle={data.ValuesSection.Title}
            cards={valueCards}
            className="py-16"
          />
        )}
      </ContentWrapper>
      {data.careerAdvantages && (
        <div className="bg-[#220B03] py-20 relative">
          <div
            className="absolute bottom-0 -left-60 md:-left-20 w-[150%] md:w-[110%] h-full pointer-events-none"
            style={{
              backgroundImage: "url('/img/pattern-dark.png')",
              backgroundPosition: "bottom left",
              backgroundSize: "110% auto",
              backgroundRepeat: "no-repeat",
            }}
          />
          <ContentWrapper>
            <Title
              as="h2"
              className="text-center text-white mb-6 text-3xl lg:text-5xl"
            >
              {data.careerAdvantages.Title}
            </Title>
            <p className="text-base text-center text-white/50 mb-12">
              {data.careerAdvantages.Description}
            </p>

            {/* Karty nad videem */}
            {data.careerAdvantages.cardsAdvantages?.Advantage &&
              data.careerAdvantages.cardsAdvantages.Advantage.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 z-100">
                  {data.careerAdvantages.cardsAdvantages.Advantage.map(
                    (advantage) => (
                      <IconCard
                        key={advantage.id}
                        icon={advantage.Icon}
                        title={advantage.Title}
                        description={advantage.Description}
                      />
                    )
                  )}
                </div>
              )}
            <Video url={data.careerAdvantages.Video} className="pt-20" />
          </ContentWrapper>
        </div>
      )}
      <ContentWrapper>
        <CareerAccordion />
        <OnboardingBanner />
      </ContentWrapper>

      {data.DayInSirius && (
        <div className="pb-10 pt-14 lg:pt-20 relative">
          <ContentWrapper>
            <Title
              as="h2"
              className="text-center text-neutral-800 mb-6 text-3xl lg:text-5xl"
            >
              {data.DayInSirius.Title}
            </Title>
            <p className="text-base text-center text-neutral-500 max-w-4xl mx-auto mb-12">
              {data.DayInSirius.Description}
            </p>
            <Video url={data.DayInSirius.Video} />
          </ContentWrapper>
          <div
            className="hidden lg:block absolute bottom-0 -left-60 md:-left-20 w-[110%] h-full -z-10 pointer-events-none"
            style={{
              backgroundImage: "url('/img/pattern-grey.png')",
              backgroundPosition: "center center",
              backgroundSize: "65% auto",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>
      )}
      <ContentWrapper>
        <CareerTimeline data={careerTimelineData} />
        <FeaturedBlog />
        <ContactFormBanner />
      </ContentWrapper>
    </>
  );
}
