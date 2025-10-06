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
  className,
}) => {
  return (
    <div
      className={cn("flex flex-col p-6 rounded-xl mt-8", className)}
      style={{
        background:
          "radial-gradient(ellipse at top left, #260D04 0%, #B63B13 100%)",
      }}
    >
      {/* Wrapper s ikonou - přesahuje ven o 32px */}
      <div className="w-16 h-16 bg-[#EC4C19] rounded-xl flex items-center justify-center mb-6 -mt-14">
        <Icon name={icon} size="L" className="text-white w-9 h-9" />
      </div>

      {/* Titulek */}
      <Title as="h4" className="text-white lg:text-[24px] mb-4">
        {title}
      </Title>

      {/* Popisek */}
      <p className="text-white/80 text-base relative z-10">{description}</p>
    </div>
  );
};
