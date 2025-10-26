/*
import type { ButtonProps } from "../Button/Button.types";

export interface ButtonLinkProps extends Omit<ButtonProps, "onClick" | "type"> {
  href: string;
}*/

// components/ButtonLink/ButtonLink.types.ts
import type { ButtonProps } from "../Button/Button.types";

export interface ButtonLinkProps extends Omit<ButtonProps, "onClick" | "type"> {
  href: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
}