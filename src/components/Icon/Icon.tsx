// src/components/Icon/Icon.tsx
import Image from "next/image";
import type { IconProps } from "./Icon.types";
import { iconSizes } from "./Icon.types";

export default function Icon({
  name,
  size = "M",
  className = "",
  variant = "default",
}: IconProps) {
  if (!name) {
    return null;
  }

  const iconName = name.trim().toLowerCase();

  const iconPath =
    variant === "default"
      ? `/icons/${iconName}.svg`
      : `/icons/${variant}/${iconName}.svg`;

  const pixelSize = typeof size === "string" ? iconSizes[size] : size;

  return (
    <Image
      src={iconPath}
      alt={iconName}
      width={pixelSize}
      height={pixelSize}
      className={className}
    />
  );
}
