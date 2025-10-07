import { getHomepage } from "@/lib/strapi";
import { ContentWrapper } from "@/components/ContentWrapper";
import { CareerBanner } from "@/components/CareerBanner";
import { ContactFormBanner } from "@/components/ContactFormBanner";
import { FeaturedBlog } from "@/components/FeaturedBlog";
import { Numbers } from "@/components/Numbers";
import { Hero } from "@/components/Hero";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { IconCard } from "@/components/IconCard";
import { Title } from "@/components/Title";
import { FeaturedTestimonials } from "@/components/FeaturedTestimonials";
import { StepsSection } from "@/components/StepsSection";

export default async function HomePage() {
  const homepage = await getHomepage();

  return (
    <div>
      <Hero
        title={homepage.HeroBanner.Title}
        description={homepage.HeroBanner.Description}
        backgroundImage="homepage.webp"
        buttonText={homepage.HeroBanner.heroBannerButton?.displayText}
        buttonUrl={homepage.HeroBanner.heroBannerButton?.Url}
        buttonPage={homepage.HeroBanner.heroBannerButton?.Page}
        buttonIsExternal={homepage.HeroBanner.heroBannerButton?.isExternal}
        type="hero"
      />
      <ContentWrapper>
        <Numbers numbers={homepage.Numbers.Number} />
      </ContentWrapper>
      <div className="bg-[#220B03] py-16 lg:py-24 ">
        {homepage.MissionClaim && (
          <ContentWrapper className="pb-100 lg:pb-60">
            <Title
              as="h2"
              className="text-center text-white mb-12 text-3xl lg:text-5xl"
            >
              {homepage.MissionClaim.Claim}
            </Title>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {homepage.MissionClaim.Mission?.map((mission) => (
                <IconCard
                  key={mission.id}
                  icon={mission.Icon}
                  title={mission.Title}
                  description={mission.Description}
                />
              ))}
            </div>
          </ContentWrapper>
        )}
      </div>
      <ContentWrapper className="-mt-100 lg:-mt-60">
        <StepsSection stepsData={homepage.Steps} />
      </ContentWrapper>

      <h1>App Advantages</h1>
      <p>Title: {homepage.appAdvantages.Title}</p>
      <p>Description: {homepage.appAdvantages.Description}</p>

      <h1>Checks</h1>
      {homepage.Checks.checkItem.map((check) => (
        <p key={check.id}>{check.Content}</p>
      ))}
      <ContentWrapper>
        <FeaturedTestimonials />
        <FeaturedProjects />
        <CareerBanner />
        <FeaturedBlog />
        <ContactFormBanner />
      </ContentWrapper>
    </div>
  );
}
