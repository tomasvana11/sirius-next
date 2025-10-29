// components/BranchesMap/BranchesMap.types.ts
import type { Branch } from "@/lib/strapi";

export interface BranchesMapProps {
  branches: Branch[];
}