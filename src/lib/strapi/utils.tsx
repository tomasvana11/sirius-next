import React from "react";
import type { RichTextNode } from "./types";
import { Title } from "@/components/Title";

export function renderRichText(nodes: RichTextNode[]): React.ReactElement[] {
  const headingStyles: Record<number, string> = {
    1: "text-5xl lg:text-7xl text-neutral-800 mt-8 md:mt-10 mb-2 md:mb-3",
    2: "text-3xl lg:text-5xl text-neutral-800 mt-8 md:mt-10 mb-2 md:mb-3",
    3: "text-2xl lg:text-3xl text-neutral-800 mt-8 md:mt-10 mb-2 md:mb-3",
    4: "text-xl text-neutral-800 mt-8 md:mt-10 mb-2 md:mb-3",
    5: "text-xl text-neutral-800 mt-8 md:mt-10 mb-2 md:mb-3",
    6: "text-xl text-neutral-800 mt-8 md:mt-10 mb-2 md:mb-3",
  };

  return nodes
    .map((node, index) => {
      if (node.type === "heading") {
        const level = node.level || 1;
        return (
          <Title
            key={index}
            as={`h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"}
            className={headingStyles[level]}
          >
            {node.children && renderRichText(node.children)}
          </Title>
        );
      }

      // Numbered list
      if (node.type === "list" && node.format === "ordered") {
        return (
          <ol
            key={index}
            className="list-decimal list-inside marker:text-golden-gate space-y-2 my-4"
          >
            {node.children && renderRichText(node.children)}
          </ol>
        );
      }

      // Bullet list
      if (node.type === "list" && node.format === "unordered") {
        return (
          <ul
            key={index}
            className="list-disc list-inside marker:text-golden-gate space-y-2 my-4"
          >
            {node.children && renderRichText(node.children)}
          </ul>
        );
      }

      // List item
      if (node.type === "list-item") {
        return (
          <li key={index} className="text-neutral-800">
            {node.children && renderRichText(node.children)}
          </li>
        );
      }

      if (node.type === "paragraph") {
        return (
          <p key={index} className="inline">
            {node.children && renderRichText(node.children)}
          </p>
        );
      }

      if (node.type === "link" && node.url) {
        return (
          <a
            key={index}
            href={node.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-golden-gate transition-colors duration-200"
          >
            {node.children && renderRichText(node.children)}
          </a>
        );
      }

      if (node.type === "text" && node.text) {
        let textContent: React.ReactNode = node.text;
        if (node.bold) textContent = <strong>{textContent}</strong>;
        if (node.italic) textContent = <em>{textContent}</em>;
        if (node.underline) textContent = <u>{textContent}</u>;
        if (node.strikethrough) textContent = <s>{textContent}</s>;
        return <React.Fragment key={index}>{textContent}</React.Fragment>;
      }

      return <React.Fragment key={index}></React.Fragment>;
    })
    .filter((element): element is React.ReactElement => element !== null);
}
