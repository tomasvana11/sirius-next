/*
import * as React from "react";
import Link from "next/link";
import { Button } from "../Button";
import type { ButtonLinkProps } from "./ButtonLink.types";

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ href, ...buttonProps }, ref) => {
    return (
      <Link href={href} ref={ref}>
        <Button {...buttonProps} />
      </Link>
    );
  }
);

ButtonLink.displayName = "ButtonLink";
*/
// components/ButtonLink/ButtonLink.tsx
import * as React from "react";
import Link from "next/link";
import { Button } from "../Button";
import type { ButtonLinkProps } from "./ButtonLink.types";

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ href, target, rel, ...buttonProps }, ref) => {
    // Pokud je to externí odkaz (target="_blank"), použijeme <a> místo Link
    if (target === "_blank") {
      return (
        <a
          href={href}
          target={target}
          rel={rel || "noopener noreferrer"}
          ref={ref}
        >
          <Button {...buttonProps} />
        </a>
      );
    }

    // Pro interní odkazy použijeme Next.js Link
    return (
      <Link href={href} ref={ref} target={target} rel={rel}>
        <Button {...buttonProps} />
      </Link>
    );
  }
);

ButtonLink.displayName = "ButtonLink";
