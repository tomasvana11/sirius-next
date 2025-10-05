import React from "react";
import { Title } from "@/components/Title";
import { ButtonLink } from "@/components/ButtonLink";
import { BlogList } from "@/components/BlogList";

export const FeaturedBlog = () => {
  return (
    <section className="space-y-6 lg:space-y-8 pt-8 pb-4 lg:pt-14 lg:pb-8">
      <div className="flex justify-start lg:justify-between">
        <Title as="h3">Nejnovější články z našeho blogu</Title>
        <ButtonLink
          href="/blog"
          variant="primary"
          theme="dark"
          className="hidden lg:flex"
        >
          Zajímá mě více
        </ButtonLink>
      </div>
      <BlogList limit={4} />
      <ButtonLink
        href="/blog"
        variant="primary"
        theme="dark"
        className="lg:hidden"
      >
        Zajímá mě více
      </ButtonLink>
    </section>
  );
};
