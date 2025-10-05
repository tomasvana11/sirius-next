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
