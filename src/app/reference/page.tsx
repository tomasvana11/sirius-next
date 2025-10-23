import { getReferencePage, getTextReferences } from "@/lib/strapi";
import { ContentWrapper } from "@/components/ContentWrapper";
import { ClientBanner } from "@/components/ClientBanner";
import { ContactFormBanner } from "@/components/ContactFormBanner";
import { Hero } from "@/components/Hero";
import { TestimonialCard } from "@/components/TestimonialCard";

export default async function ReferencePage() {
  const data = await getReferencePage();
  const allReferences = await getTextReferences("all");

  // Rozdělení na prvních 6 a zbytek
  const firstSix = allReferences.slice(0, 6);
  const remaining = allReferences.slice(6);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10 lg:py-16">
          {firstSix.map((reference) => (
            <TestimonialCard
              key={reference.id}
              review={reference.Review}
              name={reference.Name}
              yearsBeingClient={reference.yearsBeingClient}
            />
          ))}
        </div>
        <ClientBanner />
        {/* Zbývající reference */}
        {remaining.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 lg:py-12">
            {remaining.map((reference) => (
              <TestimonialCard
                key={reference.id}
                review={reference.Review}
                name={reference.Name}
                yearsBeingClient={reference.yearsBeingClient}
              />
            ))}
          </div>
        )}
        <ContactFormBanner />
      </ContentWrapper>
    </>
  );
}
