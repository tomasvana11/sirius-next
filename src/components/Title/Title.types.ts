import type { ComponentPropsWithoutRef } from "react";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface TitleProps<T extends HeadingLevel = "h1"> {
  as?: T;
  className?: string;
  children: React.ReactNode;
}

export type TitleComponentProps<T extends HeadingLevel = "h1"> = TitleProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TitleProps<T>>;