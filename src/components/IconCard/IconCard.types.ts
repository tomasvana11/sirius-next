export interface IconCardProps {
    icon: string;
    title: string;
    description?: string;
    variant?: "dark" | "light"; 
    iconPosition?: "inside" | "outside";
    padding?: "default" | "small";
    className?: string;
  }