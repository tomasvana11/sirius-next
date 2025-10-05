// lib/strapi/utils.tsx

import React from "react";
import type { RichTextNode } from "./types";

/**
 * Helper funkce pro renderování Rich Text ze Strapi
 */
export function renderRichText(nodes: RichTextNode[]): React.ReactElement[] {
  return nodes
    .map((node, index) => {
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
            className="underline hover:text-gray-300"
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
