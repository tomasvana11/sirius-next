import { getBlogPage } from "@/lib/strapi";
import { ContentWrapper } from "@/components/ContentWrapper";
import { CareerBanner } from "@/components/CareerBanner";
import { BlogList } from "@/components/BlogList";
import { ContactFormBanner } from "@/components/ContactFormBanner";
import { Hero } from "@/components/Hero";

export default async function BlogPage() {
  const homepage = await getBlogPage();
  return (
    <>
      <Hero
        title={homepage.HeroBanner.Title}
        description={homepage.HeroBanner.Description}
        backgroundImage="homepage.webp"
        buttonText={homepage.HeroBanner.heroBannerButton?.displayText}
        buttonUrl={homepage.HeroBanner.heroBannerButton?.Url}
        buttonPage={homepage.HeroBanner.heroBannerButton?.Page}
        buttonIsExternal={homepage.HeroBanner.heroBannerButton?.isExternal}
        type="default"
      />
      <ContentWrapper>
        <BlogList limit="all" className="py-10 lg:py-14" />
        <ContactFormBanner />
      </ContentWrapper>
    </>
  );
}
