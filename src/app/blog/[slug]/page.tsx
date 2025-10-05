import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getBlogBySlug, renderRichText } from "@/lib/strapi";
import { ContentWrapper } from "@/components/ContentWrapper";
import { FeaturedBlog } from "@/components/FeaturedBlog";
import { ContactFormBanner } from "@/components/ContactFormBanner";
import { Separator } from "@/components/ui/separator";
import { Title } from "@/components/Title";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Mapping pro kategorie
const categoryMap: Record<string, string> = {
  vzdelavani: "Vzdělávání",
  novinky: "Novinky",
};

const formatCategory = (category: string): string => {
  return categoryMap[category.toLowerCase()] || category;
};

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const imageUrl = blog.coverImage?.[0]?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.coverImage[0].url}`
    : null;

  return (
    <article>
      <ContentWrapper>
        <div className="max-w-4xl mx-auto py-8 lg:pb-14 lg:pt-8">
          <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8 bg-neutral-200">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={blog.coverImage?.[0]?.alternativeText || blog.Title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src="/icons/system/img-placeholder.svg"
                  alt="Placeholder"
                  width={80}
                  height={80}
                  className="opacity-40"
                />
              </div>
            )}
          </div>

          <div className="max-w-3xl mx-auto">
            <Title
              as="h1"
              className="text-5xl lg:text-6xl text-neutral-900 mb-6"
            >
              {blog.Title}
            </Title>

            <div className="flex gap-4 items-center mb-6">
              <div className="text-sm font-semibold text-golden-gate bg-golden-gate/10 px-4 py-2 rounded-full border border-golden-gate/50 uppercase">
                {formatCategory(blog.Category)}
              </div>
              <time className="text-sm text-neutral-600 block">
                {new Date(blog.publishedAt).toLocaleDateString("cs-CZ", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <div className="blog-content text-neutral-700 text-lg leading-relaxed">
              {renderRichText(blog.Content)}
            </div>
          </div>
        </div>

        <Separator />
        <FeaturedBlog />
        <ContactFormBanner />
      </ContentWrapper>
    </article>
  );
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog nenalezen",
    };
  }

  return {
    title: blog.Title,
    description: blog.Excerpt,
  };
}
