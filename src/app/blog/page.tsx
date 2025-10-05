import { ContentWrapper } from "@/components/ContentWrapper";
import { CareerBanner } from "@/components/CareerBanner";
import { BlogList } from "@/components/BlogList";
import { ContactFormBanner } from "@/components/ContactFormBanner";

export default async function BlogPage() {
  return (
    <ContentWrapper>
      <BlogList limit="all" />
      <ContactFormBanner />
    </ContentWrapper>
  );
}
