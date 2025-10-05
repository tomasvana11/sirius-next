import { ContentWrapper } from "@/components/ContentWrapper";
import { CareerBanner } from "@/components/CareerBanner";
import { FeaturedBlog } from "@/components/FeaturedBlog";
import { ContactFormBanner } from "@/components/ContactFormBanner";

export default async function HomePage() {
  return (
    <ContentWrapper>
      <CareerBanner />
      <FeaturedBlog />
      <ContactFormBanner />
    </ContentWrapper>
  );
}
