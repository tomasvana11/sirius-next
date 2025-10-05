import { ContentWrapper } from "@/components/ContentWrapper";
import { CareerBanner } from "@/components/CareerBanner";
import { ContactFormBanner } from "@/components/ContactFormBanner";

export default async function HomePage() {
  return (
    <ContentWrapper>
      <CareerBanner />
      <ContactFormBanner />
    </ContentWrapper>
  );
}
