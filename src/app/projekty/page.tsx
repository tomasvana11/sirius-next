import { getProjectsPage } from "@/lib/strapi";
import { ContentWrapper } from "@/components/ContentWrapper";
import { CareerBanner } from "@/components/CareerBanner";
import { FeaturedBlog } from "@/components/FeaturedBlog";
import { ContactFormBanner } from "@/components/ContactFormBanner";
import { ProjectsList } from "@/components/ProjectsList";
import { Hero } from "@/components/Hero";

export default async function ProjectsPage() {
  const data = await getProjectsPage();
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
        <ProjectsList limit="all" className="py-10 lg:py-14" />
        <CareerBanner />
        <FeaturedBlog />
        <ContactFormBanner />
      </ContentWrapper>
    </>
  );
}
