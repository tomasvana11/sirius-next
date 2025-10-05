import { getHomepage } from "@/lib/strapi";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Title } from "@/components/Title";
import { CareerBanner } from "@/components/CareerBanner";
import { ContactFormBanner } from "@/components/ContactFormBanner";
import { FeaturedBlog } from "@/components/FeaturedBlog";
export default async function HomePage() {
  const homepage = await getHomepage();

  return (
    <div>
      <Title as="h1">
        Hvězda Vašeho <br />
        finančního světa
      </Title>
      <Title as="h2">
        Hvězda Vašeho <br />
        finančního světa
      </Title>
      <Title as="h3">
        Hvězda Vašeho <br />
        finančního světa
      </Title>

      <ContentWrapper>
        <h1>Obsah</h1>
      </ContentWrapper>
      <h1>Hero Banner</h1>
      <p>Title: {homepage.HeroBanner.Title}</p>
      <p>Description: {homepage.HeroBanner.Description}</p>
      {homepage.HeroBanner.heroBannerButton && (
        <p>Button URL: {homepage.HeroBanner.heroBannerButton.Url}</p>
      )}

      <h1>Numbers</h1>
      {homepage.Numbers.Number.map((item) => (
        <div key={item.id}>
          <p>Number: {item.Number[0]?.children[0]?.text}</p>
          <p>Description: {item.Description}</p>
        </div>
      ))}

      <h1>Mission Claim</h1>
      <p>{homepage.MissionClaim.Claim}</p>
      {homepage.MissionClaim.Mission?.map((mission) => (
        <div key={mission.id}>
          <p>Icon: {mission.Icon}</p>
          <p>Title: {mission.Title}</p>
          <p>Description: {mission.Description}</p>
        </div>
      ))}

      <h1>App Advantages</h1>
      <p>Title: {homepage.appAdvantages.Title}</p>
      <p>Description: {homepage.appAdvantages.Description}</p>

      <h1>Steps</h1>
      <p>{homepage.Steps.Title}</p>
      {homepage.Steps.Step.map((step) => (
        <div key={step.id}>
          <p>Icon: {step.Icon?.Icon}</p>
          <p>Title: {step.Title}</p>
          <p>Description: {step.Description}</p>
        </div>
      ))}

      <h1>Checks</h1>
      {homepage.Checks.checkItem.map((check) => (
        <p key={check.id}>{check.Content}</p>
      ))}
      <ContentWrapper>
        <CareerBanner />
        <FeaturedBlog />
        <ContactFormBanner />
      </ContentWrapper>
    </div>
  );
}
