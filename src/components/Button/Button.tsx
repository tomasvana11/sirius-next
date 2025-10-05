/*
import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "./Button.types";

const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", theme = "light", children, className, ...props },
    ref
  ) => {
    const iconSrcDefault =
      theme === "light" || theme === "light2"
        ? "/icons/system/arrow-up-right-light.svg"
        : "/icons/system/arrow-up-right-dark.svg";

    const iconSrcHover =
      theme === "light" || theme === "light2"
        ? "/icons/system/arrow-up-right-dark.svg"
        : "/icons/system/arrow-up-right-light.svg";

    const baseStyles =
      "[font-family:var(--font-nunito)] [font-weight:700] cursor-pointer inline-flex items-center justify-center gap-3 rounded-full font-nunito font-bold text-base transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 group";

    const themeStyles = {
      light:
        "bg-white text-neutral-800 hover:bg-golden-gate hover:text-white focus-visible:ring-neutral-300",
      dark: "bg-golden-gate text-white hover:bg-neutral-800 focus-visible:ring-neutral-700",
      light2:
        "bg-white text-neutral-800 hover:bg-neutral-800 hover:text-white focus-visible:ring-neutral-300",
    };

    const variantStyles = {
      primary: "pl-4.5 pr-1.5 py-1.5",
      secondary: "pl-4.5 pr-1.5 py-1.5",
    };

    const iconWrapperStyles = {
      light:
        "bg-golden-gate rounded-full w-11 h-11 flex justify-center items-center relative transition-colors group-hover:bg-white",
      dark: "bg-white rounded-full w-11 h-11 flex justify-center items-center relative transition-colors group-hover:bg-golden-gate",
      light2:
        "bg-golden-gate rounded-full w-11 h-11 flex justify-center items-center relative transition-colors group-hover:bg-white",
    };

    // Memoizujeme IconComponent aby se nepřevytvářel při každém renderu
    const IconComponent = React.useMemo(
      () =>
        ({ size }: { size: number }) =>
          (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={iconSrcDefault}
                alt=""
                width={size}
                height={size}
                className={cn(
                  size === 24 ? "w-6 h-6" : "w-4 h-4",
                  "absolute transition-opacity group-hover:opacity-0"
                )}
              />
              <Image
                src={iconSrcHover}
                alt=""
                width={size}
                height={size}
                className={cn(
                  size === 24 ? "w-6 h-6" : "w-4 h-4",
                  "absolute opacity-0 transition-opacity group-hover:opacity-100"
                )}
              />
            </div>
          ),
      [iconSrcDefault, iconSrcHover]
    );

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          themeStyles[theme],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
        {variant === "primary" ? (
          <div className={iconWrapperStyles[theme]}>
            <IconComponent size={24} />
          </div>
        ) : (
          <IconComponent size={16} />
        )}
      </button>
    );
  }
);

ButtonComponent.displayName = "Button";

// Exportuj memoizovanou verzi aby se Button nepřerenderoval zbytečně
export const Button = React.memo(ButtonComponent);
*/

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "./Button.types";

const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", theme = "light", children, className, ...props },
    ref
  ) => {
    const iconSrcDefault =
      theme === "light" || theme === "light2"
        ? "/icons/system/arrow-up-right-light.svg"
        : "/icons/system/arrow-up-right-dark.svg";

    const iconSrcHover =
      theme === "light" || theme === "light2"
        ? "/icons/system/arrow-up-right-dark.svg"
        : "/icons/system/arrow-up-right-light.svg";

    const baseStyles =
      "[font-family:var(--font-nunito)] [font-weight:700] cursor-pointer inline-flex items-center justify-center transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 group";

    const themeStyles = {
      light:
        "bg-white text-neutral-800 hover:bg-golden-gate hover:text-white focus-visible:ring-neutral-300 rounded-full",
      dark: "bg-golden-gate text-white hover:bg-neutral-800 focus-visible:ring-neutral-700 rounded-full",
      light2:
        "bg-white text-neutral-800 hover:bg-neutral-800 hover:text-white focus-visible:ring-neutral-300 rounded-full",
    };

    const variantStyles = {
      primary: "pl-4.5 pr-1.5 py-1.5 gap-3",
      secondary: "gap-2 p-0 text-golden-gate",
    };

    const iconWrapperStyles = {
      light:
        "bg-golden-gate rounded-full w-11 h-11 flex justify-center items-center relative transition-colors group-hover:bg-white flex-shrink-0",
      dark: "bg-white rounded-full w-11 h-11 flex justify-center items-center relative transition-colors group-hover:bg-golden-gate flex-shrink-0",
      light2:
        "bg-golden-gate rounded-full w-11 h-11 flex justify-center items-center relative transition-colors group-hover:bg-white flex-shrink-0",
    };

    // Memoizujeme IconComponent aby se nepřevytvářel při každém renderu
    const IconComponent = React.useMemo(() => {
      const Icon = ({ size }: { size: number }) => (
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={iconSrcDefault}
            alt=""
            width={size}
            height={size}
            className={cn(
              size === 24 ? "w-6 h-6" : "w-4 h-4",
              "absolute transition-opacity group-hover:opacity-0"
            )}
          />
          <Image
            src={iconSrcHover}
            alt=""
            width={size}
            height={size}
            className={cn(
              size === 24 ? "w-6 h-6" : "w-4 h-4",
              "absolute opacity-0 transition-opacity group-hover:opacity-100"
            )}
          />
        </div>
      );
      Icon.displayName = "ButtonIcon";
      return Icon;
    }, [iconSrcDefault, iconSrcHover]);

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variant === "primary" ? themeStyles[theme] : "",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <span
          className={cn(
            variant === "secondary" &&
              "underline-offset-4 group-hover:underline transition-all duration-300"
          )}
        >
          {children}
        </span>
        {variant === "primary" ? (
          <div className={iconWrapperStyles[theme]}>
            <IconComponent size={24} />
          </div>
        ) : (
          <div className="flex-shrink-0">
            <Image
              src="/icons/system/arrow-up-right-s-orange.svg"
              alt=""
              width={22}
              height={22}
              className="w-[22px] h-[22px]"
            />
          </div>
        )}
      </button>
    );
  }
);

ButtonComponent.displayName = "Button";

export const Button = React.memo(ButtonComponent);
