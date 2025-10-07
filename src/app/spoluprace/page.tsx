import { getClientPage } from "@/lib/strapi";
import { ContentWrapper } from "@/components/ContentWrapper";
import { ContactFormBanner } from "@/components/ContactFormBanner";
import { Hero } from "@/components/Hero";
import { IconCard } from "@/components/IconCard";
import { Title } from "@/components/Title";
import { FeaturedTestimonials } from "@/components/FeaturedTestimonials";

export default async function ClientPage() {
  const data = await getClientPage();
  return (
    <>
      <Hero
        title={data.HeroBanner.Title}
        description={data.HeroBanner.Description}
        backgroundImage="homepage.webp"
        buttonText={data.HeroBanner.heroBannerButton?.displayText}
        buttonUrl={data.HeroBanner.heroBannerButton?.Url}
        buttonPage={data.HeroBanner.heroBannerButton?.Page}
        buttonIsExternal={data.HeroBanner.heroBannerButton?.isExternal}
        type="default"
      />
      {data.servicesSesction && (
        <section className="py-16">
          <ContentWrapper>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16">
              {/* Levá strana - Title a Description */}
              <div className="space-y-4">
                <Title as="h2" className="text-3xl lg:text-5xl">
                  {data.servicesSesction.Title}
                </Title>
                <p className="text-neutral-600">
                  {data.servicesSesction.Description}
                </p>
              </div>

              {/* Pravá strana - Grid karet */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {data.servicesSesction.Service.map((service) => (
                  <IconCard
                    key={service.id}
                    icon={service.Icons.Icon}
                    title={service.Title}
                    variant="light"
                    padding="small"
                    iconPosition="inside"
                  />
                ))}
              </div>
            </div>
          </ContentWrapper>
        </section>
      )}
      <div className="bg-[#220B03] py-16 lg:py-24">
        {data.ClaimSection && (
          <ContentWrapper>
            <Title
              as="h2"
              className="text-center text-white mb-12 text-3xl lg:text-5xl"
            >
              {data.ClaimSection.Claim}
            </Title>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.ClaimSection.Mission?.map((mission) => (
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
      <ContentWrapper>
        <FeaturedTestimonials />
        <ContactFormBanner />
      </ContentWrapper>
    </>
  );
}
