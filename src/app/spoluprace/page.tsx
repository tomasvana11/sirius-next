import { getClientPage } from "@/lib/strapi";
import { ContentWrapper } from "@/components/ContentWrapper";
import { CareerBanner } from "@/components/CareerBanner";
import { FeaturedBlog } from "@/components/FeaturedBlog";
import { ContactFormBanner } from "@/components/ContactFormBanner";
import { Hero } from "@/components/Hero";

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
      <ContentWrapper>
        <ContactFormBanner />
      </ContentWrapper>
    </>
  );
}
