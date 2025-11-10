import * as React from "react";
import Link from "next/link";
import { Button } from "../Button";
import type { ButtonLinkProps } from "./ButtonLink.types";

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ href, target, rel, ...buttonProps }, ref) => {
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

    return (
      <Link href={href} ref={ref} target={target} rel={rel}>
        <Button {...buttonProps} />
      </Link>
    );
  }
);

ButtonLink.displayName = "ButtonLink";
