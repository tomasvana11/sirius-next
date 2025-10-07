import type { RichTextNode } from "@/lib/strapi";

export interface TestimonialCardProps {
  review: RichTextNode[];
  name: string;
  yearsBeingClient: number;
  className?: string;
}