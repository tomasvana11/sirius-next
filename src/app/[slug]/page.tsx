// src/app/[slug]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import { getFooterPageBySlug, renderRichText } from "@/lib/strapi";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Title } from "@/components/Title";

interface FooterPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function FooterPage({ params }: FooterPageProps) {
  const { slug } = await params;
  const page = await getFooterPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <article>
      <ContentWrapper>
        <div className="max-w-4xl mx-auto py-8 lg:py-16">
          <Title as="h1" className="text-5xl lg:text-6xl text-neutral-900 mb-8">
            {page.Title}
          </Title>

          <div className="blog-content text-neutral-700 text-lg leading-relaxed">
            {renderRichText(page.Content)}
          </div>
        </div>
      </ContentWrapper>
    </article>
  );
}

export async function generateMetadata({ params }: FooterPageProps) {
  const { slug } = await params;
  const page = await getFooterPageBySlug(slug);

  if (!page) {
    return {
      title: "Stránka nenalezena",
    };
  }

  return {
    title: page.Title,
    description: `${page.Title} - Sirius Finance`,
  };
}
