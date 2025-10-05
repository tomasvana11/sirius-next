import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getBlogBySlug, renderRichText } from "@/lib/strapi";
import { ContentWrapper } from "@/components/ContentWrapper";
import { FeaturedBlog } from "@/components/FeaturedBlog";
import { ContactFormBanner } from "@/components/ContactFormBanner";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

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
    <article className="pt-16">
      <ContentWrapper>
        <div className="max-w-4xl mx-auto">
          {imageUrl && (
            <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8">
              <Image
                src={imageUrl}
                alt={blog.coverImage?.[0]?.alternativeText || blog.Title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="max-w-3xl mx-auto">
            <div className="text-sm font-semibold text-golden-gate uppercase mb-4">
              {blog.Category}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              {blog.Title}
            </h1>

            <time className="text-sm text-neutral-500 mb-8 block">
              {new Date(blog.publishedAt).toLocaleDateString("cs-CZ", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>

            <div className="prose prose-lg max-w-none text-neutral-700">
              {renderRichText(blog.Content)}
            </div>
          </div>
        </div>
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
