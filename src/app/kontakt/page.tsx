import { getContactPage } from "@/lib/strapi";
import { ContentWrapper } from "@/components/ContentWrapper";
import { ContactFormBanner } from "@/components/ContactFormBanner";
import { Hero } from "@/components/Hero";

export default async function ContactPage() {
  const data = await getContactPage();
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
      <ContentWrapper className="pt-8 lg:pt-14 flex gap-8 items-stretch flex-col xl:flex-row">
        <ContactFormBanner className="w-full xl:flex-1" />
        <div className="w-full xl:flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            {/* Email Card */}
            <div className="bg-neutral-100 border border-neutral-200 rounded-xl p-6">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-4">
                <img src="/icons/system/email.svg" alt="" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 [font-family:var(--font-nunito)] [font-weight:700]">
                info@siriusfinance.cz
              </h3>
              <p className="text-neutral-600">Všední dny 9:00 - 17:00</p>
            </div>
            {/* Company Card */}
            <div className="bg-neutral-100 border border-neutral-200 rounded-xl p-6">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-4">
                <img
                  src="/icons/system/document.svg"
                  alt=""
                  className="w-8 h-8"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 [font-family:var(--font-nunito)] [font-weight:700]">
                SIRIUS FINANCE, a.s.
              </h3>
              <p className="text-neutral-600">IČ: 055 51 421</p>
              <p className="text-neutral-600">DIČ: CZ05551421</p>
            </div>
            {/* Prague Address Card */}
            <div className="bg-neutral-100 border border-neutral-200 rounded-xl p-6">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-4">
                <img
                  src="/icons/system/location.svg"
                  alt=""
                  className="w-8 h-8"
                />
              </div>
              <h3 className="text-lg font-semibold mb-1 [font-family:var(--font-nunito)] [font-weight:700]">
                Lighthouse Tower,
              </h3>
              <h3 className="text-lg font-semibold mb-1 [font-family:var(--font-nunito)] [font-weight:700]">
                Jankovcova 1569/2C,
              </h3>
              <h3 className="text-lg font-semibold mb-3 [font-family:var(--font-nunito)] [font-weight:700]">
                170 00 Praha 7
              </h3>
            </div>
            {/* Brno Address Card */}
            <div className="bg-neutral-100 border border-neutral-200 rounded-xl p-6">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-4">
                <img
                  src="/icons/system/location.svg"
                  alt=""
                  className="w-8 h-8"
                />
              </div>
              <h3 className="text-lg font-semibold mb-1 [font-family:var(--font-nunito)] [font-weight:700]">
                Vídeňská 995/63,
              </h3>
              <h3 className="text-lg font-semibold [font-family:var(--font-nunito)] [font-weight:700]">
                Brno
              </h3>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </>
  );
}
