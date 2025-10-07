import * as React from "react";
import { cn } from "@/lib/utils";
import type { HeadingLevel, TitleComponentProps } from "./Title.types";

export const Title = <T extends HeadingLevel = "h1">({
  as,
  className,
  children,
  ...props
}: TitleComponentProps<T>) => {
  const Component = as || "h1";

  const baseStyles = "[font-family:var(--font-nunito)] [font-weight:700]";

  const headingStyles: Record<HeadingLevel, string> = {
    h1: "text-5xl lg:text-7xl",
    h2: "text-3xl lg:text-5xl",
    h3: "text-2xl lg:text-3xl",
    h4: "text-xl lg:text-2xl",
    h5: "text-xl",
    h6: "text-xl",
  };

  return (
    <Component
      className={cn(baseStyles, headingStyles[Component], className)}
      {...props}
    >
      {children}
    </Component>
  );
};

Title.displayName = "Title";
