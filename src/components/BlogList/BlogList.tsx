import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getBlogs } from "@/lib/strapi";
import { Title } from "@/components/Title";
import { ButtonLink } from "@/components/ButtonLink";
import { cn } from "@/lib/utils";
import type { BlogListProps } from "./BlogList.types";

export const BlogList = async ({ limit = 4, className }: BlogListProps) => {
  const blogs = await getBlogs(limit);

  if (!blogs || blogs.length === 0) {
    return null;
  }

  // Mapping pro kategorie
  const categoryMap: Record<string, string> = {
    vzdelavani: "Vzdělávání",
    novinky: "Novinky",
  };

  const formatCategory = (category: string): string => {
    return categoryMap[category.toLowerCase()] || category;
  };

  return (
    <section className={cn(className)}>
      {/* Desktop: 4 sloupce, Tablet: 2 sloupce, Mobile: 1 sloupec */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs.map((blog) => {
          const blogSlug = blog.slug || blog.documentId;
          const imageUrl = blog.coverImage?.[0]?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.coverImage[0].url}`
            : null;

          return (
            <article
              key={blog.id}
              className="group overflow-hidden h-full flex flex-col"
            >
              {/* Obrázek */}
              {imageUrl && (
                <Link href={`/blog/${blogSlug}`} className="block">
                  <div className="relative w-full aspect-[4/2] bg-neutral-100 rounded-xl overflow-hidden mb-3">
                    <Image
                      src={imageUrl}
                      alt={blog.coverImage?.[0]?.alternativeText || blog.Title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </Link>
              )}

              {/* Obsah */}
              <div className="flex flex-col flex-grow space-y-2">
                {/* Datum a kategorie */}
                <div className="text-sm text-neutral-400">
                  {new Date(blog.publishedAt).toLocaleDateString("cs-CZ", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })}{" "}
                  • {formatCategory(blog.Category)}
                </div>

                {/* Titulek */}
                <Link href={`/blog/${blogSlug}`}>
                  <Title
                    as="h4"
                    className="text-neutral-800 line-clamp-2 underline-offset-4 group-hover:underline transition-all duration-300"
                  >
                    {blog.Title}
                  </Title>
                </Link>

                {/* Excerpt */}
                <p className="text-neutral-500 text-sm line-clamp-3 flex-grow">
                  {blog.Excerpt}
                </p>

                {/* ButtonLink */}
                <div className="pt-2">
                  <ButtonLink
                    href={`/blog/${blogSlug}`}
                    variant="secondary"
                    theme="light"
                  >
                    Přečíst článek
                  </ButtonLink>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
