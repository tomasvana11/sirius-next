// lib/strapi/types.ts

/**
 * Obecné Strapi typy
 */
export interface StrapiResponse<T> {
    data: T;
    meta: Record<string, unknown>;
  }
  
  export interface RichTextNode {
    type: string;
    text?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    url?: string;
    level?: number;
    format?: "ordered" | "unordered";
    children?: RichTextNode[];
  }
  
  /**
   * Top Bar typy
   */
  export interface TopBar {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    Message: RichTextNode[];
    Links?: Array<{
      id: number;
      Label: string;
      Url: string;
      Icon: string | null;
    }>;
  }
  
  /**
   * Homepage typy
   */
  export interface Homepage {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    HeroBanner: {
      id: number;
      Title: string;
      Description: string;
      heroBannerButton?: {
        id: number;
        displayText: string;
        Url: string;
        Page: string;
        isExternal: boolean;
      };
    };
    Numbers: {
      id: number;
      Number: Array<{
        id: number;
        Number: Array<{
          type: string;
          children: Array<{ text: string; type: string }>;
        }>;
        Description: string;
      }>;
    };
    appAdvantages: {
      id: number;
      Title: string;
      Description: string;
    };
    Facts: null | {
      id: number;
      [key: string]: unknown;
    };
    Steps: {
      id: number;
      Title: string;
      Step: Array<{
        id: number;
        Title: string;
        Description: string;
        Icon?: {
          id: number;
          Icon: string;
        };
      }>;
    };
    Checks: {
      id: number;
      checkItem: Array<{
        id: number;
        Content: string;
      }>;
    };
    MissionClaim: {
      id: number;
      Claim: string;
      Mission?: Array<{
        id: number;
        Icon: string;
        Title: string;
        Description: string;
      }>;
    };
  }

  /**
   * Blogpage typy
   */
  export interface BlogPage {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    HeroBanner: {
      id: number;
      Title: string;
      Description: string;
      heroBannerButton?: {
        id: number;
        displayText: string;
        Url: string;
        Page: string;
        isExternal: boolean;
      };
    };
  }
  /**
   * Blogpage typy
   */
  export interface ProjectsPage {
    id: number;
    documentId: string;
    HeroBanner: {
      id: number;
      Title: string;
      Description: string;
      heroBannerButton?: {
        id: number;
        displayText: string;
        Url: string;
        Page: string;
        isExternal: boolean;
      };
    };
  }

  /**
 * Social Media typy
 */
export type SocialMediaPlatform = "facebook" | "instagram" | "linkedin" | "youtube" | "other";

export interface SocialMediaLink {
  id: number;
  Platform: SocialMediaPlatform;
  Url: string;
}

export interface SocialMedia {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  socialMediaLinks: SocialMediaLink[];
}

export interface CareerBannerLink {
  id: number;
  Url: string;
  isExternal: boolean;
}

export interface CareerBanner {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Title: string;
  Description: string;
  bannerLink?: CareerBannerLink[];
}

export interface ContactFormData {
  Name: string;
  Phone: string;
  Email: string;
}

export interface ContactFormSubmission {
  id: number;
  documentId: string;
  Name: string;
  Phone: string;
  Email: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface FormBanner {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Title: string;
  Description: string;
}

//Blog
export interface StrapiImage {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
  url: string;
}

export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface BlogPost {
  id: number;
  documentId: string;
  Title: string;
  Content: RichTextNode[];
  Excerpt: string;
  Category: string;
  slug: string | null;
  coverImage?: StrapiImage[]; // Změna: pole obrázků
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface BlogsResponse {
  data: BlogPost[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// pageTypes.ts

export interface ContactPage {
  id: number;
  documentId: string;
  HeroBanner: {
    id: number;
    Title: string;
    Description: string;
    heroBannerButton?: {
      id: number;
      displayText: string;
      Url: string;
      Page: string;
      isExternal: boolean;
    };
  };
}

export interface ReferencePage {
  id: number;
  documentId: string;
  HeroBanner: {
    id: number;
    Title: string;
    Description: string;
    heroBannerButton?: {
      id: number;
      displayText: string;
      Url: string;
      Page: string;
      isExternal: boolean;
    };
  };
}

export interface ClientPage {
  id: number;
  documentId: string;
  HeroBanner: {
    id: number;
    Title: string;
    Description: string;
    heroBannerButton?: {
      id: number;
      displayText: string;
      Url: string;
      Page: string;
      isExternal: boolean;
    };
  };
  ClaimSection?: ClaimSection;
}

export interface OnasPage {
  id: number;
  documentId: string;
  HeroBanner: {
    id: number;
    Title: string;
    Description: string;
    heroBannerButton?: {
      id: number;
      displayText: string;
      Url: string;
      Page: string;
      isExternal: boolean;
    };
  };
  valuesSection?: ValuesSection;
  videoSection?: VideoSection;
}

export interface CareerPage {
  id: number;
  documentId: string;
  HeroBanner: {
    id: number;
    Title: string;
    Description: string;
    heroBannerButton?: {
      id: number;
      displayText: string;
      Url: string;
      Page: string;
      isExternal: boolean;
    };
  };
  ValuesSection?: ValuesSection;
  DayInSirius?: DayInSirius;
  careerAdvantages?: CareerAdvantages;
}

/**
 * TeamMember typy
 */
export interface TeamMember {
  id: number;
  documentId: string;
  Name: string;
  Position: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Photo?: StrapiImage[];
}

/**
 * Project typy
 */
export interface Project {
  id: number;
  documentId: string;
  Name: string;
  Description: string;
  Link: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  coverImage?: StrapiImage[];
  clenove_tymu?: TeamMember;  // Jeden člen týmu (ne array, protože je to 1:1 relace)
}

export interface ProjectsResponse {
  data: Project[];
  meta: {
    pagination: {
      start: number;
      limit: number;
      total: number;
    };
  };
}

/**
 * Partner typy
 */
export interface Partner {
  id: number;
  documentId: string;
  Title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Logo?: StrapiImage[];
}

export interface PartnersResponse {
  data: Partner[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}


/**
 * Career Questions typy
 */
export interface CareerQuestion {
  id: number;
  Question: string;
  Answer: RichTextNode[];
}

export interface QuestionsSection {
  id: number;
  Title: string;
  Description?: string | null;
  Question: CareerQuestion[];
}

export interface Career {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  questionsSection: QuestionsSection;
  ValuesSection?: ValuesSection;
}

export interface CareerResponse {
  data: Career;
  meta: Record<string, unknown>;
}

/**
 * Value Card typy
 */
export interface ValueCard {
  id: number;
  Title: string;
  Detail: string;
  backgroundImage?: StrapiImage | null; 
}

export interface ValuesSection {
  id: number;
  Title: string;
  Value: ValueCard[];
}

export interface VideoSection {
  id: number;
  Title: string;
  Description: string;
  Video: string;
}

export interface DayInSirius {
  id: number;
  Title: string;
  Description: string;
  Video: string;
}

export interface ClaimSection {
  id: number;
  Claim: string;
  Mission?: Array<{
    id: number;
    Icon: string;
    Title: string;
    Description: string;
  }>;
}

export interface CareerAdvantage {
  id: number;
  Icon: string;
  Title: string;
  Description: string;
}

export interface CareerAdvantages {
  id: number;
  Title: string;
  Description: string;
  Video: string;
  cardsAdvantages?: {
    id: number;
    Advantage: CareerAdvantage[];
  };
}