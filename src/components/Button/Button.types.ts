import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  theme?: "dark" | "light" | "light2";
  children: React.ReactNode;
}