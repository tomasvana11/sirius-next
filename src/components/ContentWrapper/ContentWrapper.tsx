import React from "react";
import type { ContentWrapperProps } from "./ContentWrapper.types";

export const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`max-w-[1400px] w-full mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
};
