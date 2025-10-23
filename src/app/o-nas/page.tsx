import { getOnasPage } from "@/lib/strapi";
import { ContentWrapper } from "@/components/ContentWrapper";
import { CareerBanner } from "@/components/CareerBanner";
import { FeaturedBlog } from "@/components/FeaturedBlog";
import { ContactFormBanner } from "@/components/ContactFormBanner";
import { Hero } from "@/components/Hero";
import { FeaturedTeam } from "@/components/FeaturedTeam";
import { FeaturedPartners } from "@/components/FeaturedPartners";
import { FlipCards } from "@/components/FlipCards";
import { Video } from "@/components/Video";
import { Title } from "@/components/Title";

export default async function OnasPage() {
  const data = await getOnasPage();

  const valueCards =
    data.valuesSection?.Value.map((value) => {
      const imageUrl = value.backgroundImage?.url
        ? value.backgroundImage.url
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
        type="default"
      />
      <ContentWrapper>
        {data.valuesSection && (
          <FlipCards
            sectionTitle={data.valuesSection.Title}
            cards={valueCards}
            className="py-16"
          />
        )}
      </ContentWrapper>
      {data.videoSection && (
        <div className="bg-[#220B03] py-20 relative z-0 overflow-hidden">
          <div
            className="absolute bottom-0  w-[150%] md:w-[110%] -left-60 md:-left-20 h-full pointer-events-none -z-50"
            style={{
              backgroundImage: "url('/img/pattern-dark.png')",
              backgroundPosition: "bottom left",
              backgroundSize: "100% auto",
              backgroundRepeat: "no-repeat",
            }}
          />
          <ContentWrapper>
            <Title
              as="h2"
              className="text-center text-white mb-6 text-3xl lg:text-5xl"
            >
              {data.videoSection.Title}
            </Title>
            <p className="text-base text-center text-white/50 mb-12">
              {data.videoSection.Description}
            </p>
            <Video url={data.videoSection.Video} />
          </ContentWrapper>
        </div>
      )}

      <ContentWrapper>
        <FeaturedTeam />
        <FeaturedPartners />
        <CareerBanner />
        <FeaturedBlog />
        <ContactFormBanner />
      </ContentWrapper>
    </>
  );
}
