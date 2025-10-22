/*
export interface IconProps {
    name: string | null;
    size?: IconSize | number;
    className?: string;
    variant?: "default" | "outlined" | "filled";
  }
  
  export type IconSize = "S" | "M" | "L";
  
  export type IconVariant = "default" | "outlined" | "filled";
  
  export const iconSizes: Record<IconSize, number> = {
    S: 18,
    M: 24,
    L: 32,
  };
  */

  // components/Icon/Icon.types.ts
export interface IconProps {
  name: string | null;
  size?: IconSize | number;
  className?: string;
  variant?: "default" | "outlined" | "filled" | "white" | "orange";
}

// Velikosti ikon
export type IconSize = "S" | "M" | "L";
export type IconVariant = "default" | "outlined" | "filled" | "white" | "orange";

// Mapování velikostí na pixely
export const iconSizes: Record<IconSize, number> = {
  S: 18,
  M: 24,
  L: 32,
};