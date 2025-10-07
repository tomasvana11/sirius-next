// lib/strapi/services.ts

import { strapiRequest } from "./config";
import type { StrapiResponse, TopBar, Homepage, BlogPage, ProjectsPage, ContactPage, ReferencePage, ClientPage, OnasPage, CareerPage,Career, SocialMedia, CareerBanner, ContactFormData, FormBanner, BlogPost, BlogsResponse, Project, ProjectsResponse, TeamMember, Partner, PartnersResponse, CareerResponse, QuestionsSection, TextReferencesResponse, TextReference } from "./types";

/**
 * Služba pro Top Bar
 */
export async function getTopBar(): Promise<TopBar | null> {
  try {
    const response = await strapiRequest<StrapiResponse<TopBar>>("top-bar", {
      populate: ["Links"],
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch top-bar:", error);
    return null;
  }
}
/**
 * Služba pro Homepage
 */
export async function getHomepage(): Promise<Homepage> {
    const response = await strapiRequest<StrapiResponse<Homepage>>("homepage", {
      populate: {
        "populate[HeroBanner][populate][heroBannerButton][populate]": "*",
        "populate[Numbers][populate][Number][populate]": "*",
        "populate[appAdvantages][populate]": "*",
        "populate[MissionClaim][populate][Mission][populate]": "*",
        "populate[Facts][populate]": "*",
        "populate[Steps][populate][Step][populate][Icon][populate]": "*",
        "populate[Checks][populate][checkItem][populate]": "*",
        "populate[Steps][populate][button][populate]": "*",
        
      },
    });
    return response.data;
  }
  /**
 * Služba pro Blogpage
 */
export async function getBlogPage(): Promise<BlogPage> {
    const response = await strapiRequest<StrapiResponse<BlogPage>>("blogpage", {
      populate: {
        "populate[HeroBanner][populate][heroBannerButton][populate]": "*",
      },
    });
    return response.data;
  }
   /**
 * Služba pro Projekty
 */
export async function getProjectsPage(): Promise<ProjectsPage> {
    const response = await strapiRequest<StrapiResponse<ProjectsPage>>("projekty", {
      populate: {
        "populate[HeroBanner][populate][heroBannerButton][populate]": "*",
      },
    });
    return response.data;
  }
/**
 * Typ pro blog post response
 */
interface BlogPostData {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  publishedAt: string;
  author?: unknown;
  categories?: unknown[];
  coverImage?: unknown;
}

/**
 * Příklad služby pro další content type (např. Blog)
 */
export async function getBlogPosts() {
  const response = await strapiRequest<StrapiResponse<BlogPostData[]>>("blog-posts", {
    populate: ["author", "categories", "coverImage"],
  });
  return response.data;
}

/**
 * Příklad služby pro jednotlivý blog post
 */
export async function getBlogPost(slug: string) {
  const response = await strapiRequest<StrapiResponse<BlogPostData>>(
    `blog-posts/${slug}`,
    {
      populate: ["author", "categories", "coverImage", "content"],
    }
  );
  return response.data;
}

/**
 * Typ pro About page
 */
interface AboutPageData {
  id: number;
  documentId: string;
  team?: unknown;
  values?: unknown;
  history?: unknown;
}

/**
 * Příklad služby pro About page
 */
export async function getAboutPage() {
  const response = await strapiRequest<StrapiResponse<AboutPageData>>("about-page", {
    populate: {
      "populate[team][populate]": "*",
      "populate[values][populate]": "*",
      "populate[history][populate]": "*",
    },
  });
  return response.data;
}

/**
 * Služba pro Social Media
 */
export async function getSocialMedia(): Promise<SocialMedia | null> {
  try {
    const response = await strapiRequest<StrapiResponse<SocialMedia>>(
      "social-media",
      {
        populate: ["socialMediaLinks"],
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch social media:", error);
    return null;
  }
}

/**
 * Služba pro Career Banner
 */
export async function getCareerBanner(): Promise<CareerBanner | null> {
  try {
    const response = await strapiRequest<StrapiResponse<CareerBanner>>(
      "career-banner",
      {
        populate: ["bannerLink"],
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch career banner:", error);
    return null;
  }
}

/**
 * Typ pro vytvoření form submission
 */
export interface CreateFormSubmissionData {
  fullName: string;
  phone: string;
  email: string;
  gdprConsent: boolean;
}


/**
 * Služba pro odeslání kontaktního formuláře
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/poptavky-z-formulares`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({ data }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error: "Nepodařilo se odeslat formulář" };
  }
}

/**
 * Služba pro Form Banner
 */
export async function getFormBanner(): Promise<FormBanner | null> {
  try {
    const response = await strapiRequest<StrapiResponse<FormBanner>>(
      "form",
      {}
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch form banner:", error);
    return null;
  }
}


export async function getBlogs(limit?: number | "all"): Promise<BlogPost[]> {
  try {
    const params: {
      sort: string[];
      populate: string[];
      pagination?: { limit: number };
    } = {
      sort: ["publishedAt:desc"],
      populate: ["coverImage"],
    };

    if (limit !== "all" && limit) {
      params.pagination = { limit };
    }

    const response = await strapiRequest<BlogsResponse>(
      "blogs",
      params
    );
    
    return response.data || [];
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    let response = await strapiRequest<BlogsResponse>(
      "blogs",
      {
        filters: {
          slug: {
            $eq: slug,
          },
        },
        populate: ["coverImage"],
      }
    );
    
    if (!response.data || response.data.length === 0) {
      response = await strapiRequest<BlogsResponse>(
        "blogs",
        {
          filters: {
            documentId: {
              $eq: slug,
            },
          },
          populate: ["coverImage"],
        }
      );
    }
    
    return response.data?.[0] || null;
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return null;
  }
}

export async function getContactPage(): Promise<ContactPage> {
  const response = await strapiRequest<StrapiResponse<ContactPage>>("kontakty", {
    populate: {
      "populate[HeroBanner][populate][heroBannerButton][populate]": "*",
    },
  });
  return response.data;
}

export async function getReferencePage(): Promise<ReferencePage> {
  const response = await strapiRequest<StrapiResponse<ReferencePage>>("reference", {
    populate: {
      "populate[HeroBanner][populate][heroBannerButton][populate]": "*",
    },
  });
  return response.data;
}

export async function getClientPage(): Promise<ClientPage> {
  const response = await strapiRequest<StrapiResponse<ClientPage>>("client", {
    populate: {
      "populate[HeroBanner][populate][heroBannerButton][populate]": "*",
      "populate[ClaimSection][populate][Mission][populate]": "*",
      "populate[servicesSesction][populate][Service][populate]": "*",
    },
  });
  return response.data;
}


export async function getOnasPage(): Promise<OnasPage> {
  const response = await strapiRequest<StrapiResponse<OnasPage>>("about", {
    populate: {
      "populate[HeroBanner][populate][heroBannerButton][populate]": "*",
      "populate[valuesSection][populate][Value][populate]": "*",
      "populate[videoSection]": "*",
    },
  });
  return response.data;
}

export async function getCareerPage(): Promise<CareerPage> {
  const response = await strapiRequest<StrapiResponse<CareerPage>>("career", {
    populate: {
      "populate[HeroBanner][populate][heroBannerButton][populate]": "*",
      "populate[ValuesSection][populate][Value][populate]": "*",
      "populate[DayInSirius]": "*",
      "populate[careerAdvantages][populate][cardsAdvantages][populate]": "*",
    },
  });
  return response.data;
}


/**
 * Služba pro získání projektů
 */
export async function getProjects(limit?: number | "all"): Promise<Project[]> {
  try {
    const params: {
      sort: string[];
      populate: string[];
      pagination?: { limit: number };
    } = {
      sort: ["publishedAt:desc"],
      populate: ["coverImage", "clenove_tymu.Photo"],
    };

    if (limit !== "all" && limit) {
      params.pagination = { limit };
    }

    const response = await strapiRequest<ProjectsResponse>(
      "projects",
      params
    );

    return response.data || [];
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

/**
 * Služba pro získání členů týmu
 */
export async function getTeamMembers(limit?: number | "all"): Promise<TeamMember[]> {
  try {
    const params: {
      sort: string[];
      populate: string[];
      pagination?: { limit: number };
    } = {
      sort: ["publishedAt:desc"],
      populate: ["Photo"],
    };

    if (limit !== "all" && limit) {
      params.pagination = { limit };
    }

    const response = await strapiRequest<{ data: TeamMember[] }>(
      "team-members",
      params
    );

    return response.data || [];
  } catch (error) {
    console.error("Failed to fetch team members:", error);
    return [];
  }
}

/**
 * Služba pro získání partnerů
 */
export async function getPartners(limit?: number | "all"): Promise<Partner[]> {
  try {
    const params: {
      sort: string[];
      populate: string[];
      pagination?: { limit: number };
    } = {
      sort: ["publishedAt:desc"],
      populate: ["Logo"],
    };

    if (limit !== "all" && limit) {
      params.pagination = { limit };
    }

    const response = await strapiRequest<PartnersResponse>(
      "partners",
      params
    );

    return response.data || [];
  } catch (error) {
    console.error("Failed to fetch partners:", error);
    return [];
  }
}

/**
 * Služba pro získání kariérních otázek
 */
export async function getCareerQuestions(): Promise<QuestionsSection | null> {
  try {
    const params: {
      sort: string[];
      populate: string[];
    } = {
      sort: ["publishedAt:desc"],
      populate: ["questionsSection.Question"],
    };

    const response = await strapiRequest<CareerResponse>(
      "career",
      params
    );

    return response.data?.questionsSection || null;
  } catch (error) {
    console.error("Failed to fetch career questions:", error);
    return null;
  }
}

/**
 * Služba pro získání career page včetně values
 */
export async function getCareer(): Promise<Career | null> {
  try {
    const params: {
      sort: string[];
      populate: string[];
    } = {
      sort: ["publishedAt:desc"],
      populate: [
        "questionsSection.Question",
        "ValuesSection.Value.backgroundImage"
      ],
    };

    const response = await strapiRequest<CareerResponse>(
      "career",
      params
    );

    return response.data || null;
  } catch (error) {
    console.error("Failed to fetch career:", error);
    return null;
  }
}

/**
 * Služba pro získání referencí
 */
export async function getTextReferences(limit?: number | "all"): Promise<TextReference[]> {
  try {
    const params: {
      sort: string[];
      pagination?: { limit: number };
    } = {
      sort: ["publishedAt:desc"],
    };

    if (limit !== "all" && limit) {
      params.pagination = { limit };
    }

    const response = await strapiRequest<TextReferencesResponse>(
      "text-references",
      params
    );

    return response.data || [];
  } catch (error) {
    console.error("Failed to fetch text references:", error);
    return [];
  }
}