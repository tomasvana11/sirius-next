// components/Timeline/Timeline.types.ts
import type { IconProps } from '@/components/Icon';

export interface TimelineTag {
  id: string;
  Icon: IconProps['name']; // Použije typ přímo z Icon komponenty
  Label: string;
}

export interface TimelineStep {
  id: string;
  Icon: IconProps['name']; // Použije typ přímo z Icon komponenty
  Title: string;
  Description: string;
}

export interface TimelineProps {
  BackgroundImage: {
    url: string;
    alternativeText?: string;
  };
  Title: string;
  Description: string;
  Tags: TimelineTag[];
  Steps: TimelineStep[];
}