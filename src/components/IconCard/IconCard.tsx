// components/IconCard/IconCard.tsx
import React from "react";
import Icon from "@/components/Icon";
import { Title } from "@/components/Title";
import { cn } from "@/lib/utils";
import type { IconCardProps } from "./IconCard.types";

export const IconCard: React.FC<IconCardProps> = ({
  icon,
  title,
  description,
  variant = "dark",
  iconPosition = "outside",
  padding = "default",
  className,
}) => {
  const isDark = variant === "dark";
  const isOutside = iconPosition === "outside";
  const isSmallPadding = padding === "small";

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl relative",
        isDark
          ? isSmallPadding
            ? "p-4"
            : "p-6"
          : isSmallPadding
          ? "p-4"
          : "p-8",
        isOutside && "mt-8",
        className
      )}
      style={
        isDark
          ? {
              background:
                "radial-gradient(ellipse at top left, #260D04 0%, #B63B13 100%)",
            }
          : {
              background: "rgba(236, 76, 25, 0.1)",
            }
      }
    >
      {/* Wrapper s ikonou */}
      <div
        className={cn(
          "w-16 h-16 flex items-center justify-center mb-6",
          isSmallPadding ? "rounded-lg" : "rounded-xl",
          isDark ? "bg-[#EC4C19]" : "bg-white",
          isOutside && "-mt-14"
        )}
      >
        <Icon
          name={icon}
          size="L"
          className={cn("w-9 h-9", isDark ? "text-white" : "text-[#EC4C19]")}
        />
      </div>

      {/* Titulek */}
      <Title
        as="h4"
        className={cn(
          "lg:text-[24px]",
          description && "mb-4",
          isDark ? "text-white" : "text-neutral-800"
        )}
      >
        {title}
      </Title>

      {/* Popisek - volitelný */}
      {description && (
        <p
          className={cn(
            "text-base",
            isDark ? "text-white/80" : "text-neutral-600"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};
