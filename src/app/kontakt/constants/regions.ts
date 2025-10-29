// app/kontakt/constants/regions.ts
import type { RegionEnum } from "@/lib/strapi";

export const REGION_TO_SVG_ID: Record<RegionEnum, string> = {
  "Hlavní město Praha": "praha",
  "Středočeský kraj": "stredocesky",
  "Jihočeský kraj": "jihocesky",
  "Plzeňský kraj": "plzensky",
  "Karlovarský kraj": "karlovarsky",
  "Ústecký kraj": "ustecky",
  "Liberecký kraj": "liberecky",
  "Královéhradecký kraj": "kralovehradecky",
  "Pardubický kraj": "pardubicky",
  "Kraj Vysočina": "vysocina",
  "Jihomoravský kraj": "jihomoravsky",
  "Olomoucký kraj": "olomoucky",
  "Zlínský kraj": "zlinsky",
  "Moravskoslezský kraj": "moravskoslezsky",
};

export const SVG_ID_TO_REGION: Record<string, RegionEnum> = Object.entries(
  REGION_TO_SVG_ID
).reduce((acc, [region, svgId]) => {
  acc[svgId] = region as RegionEnum;
  return acc;
}, {} as Record<string, RegionEnum>);

export const REGIONS: RegionEnum[] = [
  "Hlavní město Praha",
  "Středočeský kraj",
  "Jihočeský kraj",
  "Plzeňský kraj",
  "Karlovarský kraj",
  "Ústecký kraj",
  "Liberecký kraj",
  "Královéhradecký kraj",
  "Pardubický kraj",
  "Kraj Vysočina",
  "Jihomoravský kraj",
  "Olomoucký kraj",
  "Zlínský kraj",
  "Moravskoslezský kraj",
];