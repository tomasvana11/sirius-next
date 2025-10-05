/*

export const STRAPI_CONFIG = {
    baseUrl: "https://sirius-strapi-qbx63.ondigitalocean.app/api",
    revalidate: 60,
  } as const;
  
  export async function strapiRequest<T>(
    endpoint: string,
    options?: {
      populate?: Record<string, string> | string[];
      revalidate?: number;
      cache?: RequestCache;
    }
  ): Promise<T> {
    const url = new URL(`${STRAPI_CONFIG.baseUrl}/${endpoint}`);
  
    // Přidání populate parametrů
    if (options?.populate) {
      if (Array.isArray(options.populate)) {
        // Jednoduchý populate: ["field1", "field2"]
        options.populate.forEach((field) => {
          url.searchParams.append("populate", field);
        });
      } else {
        // Komplexní populate: { "field[populate]": "*" }
        Object.entries(options.populate).forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });
      }
    }
  
    try {
      const res = await fetch(url.toString(), {
        next: {
          revalidate: options?.revalidate ?? STRAPI_CONFIG.revalidate,
        },
        cache: options?.cache,
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error(`Strapi API error [${endpoint}]:`, res.status, errorText);
        throw new Error(
          `Failed to fetch from ${endpoint}: ${res.status} ${res.statusText}`
        );
      }
  
      return await res.json();
    } catch (error) {
      console.error(`Strapi fetch error [${endpoint}]:`, error);
      throw error;
    }
  }
  */

  // lib/strapi/config.ts
/**
 * Centrální konfigurace pro Strapi API
 */

/*
export const STRAPI_CONFIG = {
  baseUrl: "https://sirius-strapi-qbx63.ondigitalocean.app/api",
  revalidate: 60,
} as const;


export async function strapiRequest<T>(
  endpoint: string,
  options?: {
    populate?: Record<string, string> | string[];
    filters?: Record<string, any>;
    sort?: string[];
    pagination?: Record<string, number>;
    revalidate?: number;
    cache?: RequestCache;
  }
): Promise<T> {
  const url = new URL(`${STRAPI_CONFIG.baseUrl}/${endpoint}`);

  // Přidání populate parametrů
  if (options?.populate) {
    if (Array.isArray(options.populate)) {
      // Jednoduchý populate: ["field1", "field2"]
      options.populate.forEach((field) => {
        url.searchParams.append("populate", field);
      });
    } else {
      // Komplexní populate: { "field[populate]": "*" }
      Object.entries(options.populate).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
  }

  // Přidání filters
  if (options?.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        Object.entries(value).forEach(([operator, val]) => {
          url.searchParams.append(`filters[${key}][${operator}]`, String(val));
        });
      } else {
        url.searchParams.append(`filters[${key}]`, String(value));
      }
    });
  }

  // Přidání sort
  if (options?.sort) {
    options.sort.forEach((sortParam) => {
      url.searchParams.append("sort", sortParam);
    });
  }

  // Přidání pagination
  if (options?.pagination) {
    Object.entries(options.pagination).forEach(([key, value]) => {
      url.searchParams.append(`pagination[${key}]`, String(value));
    });
  }

  try {
    const res = await fetch(url.toString(), {
      next: {
        revalidate: options?.revalidate ?? STRAPI_CONFIG.revalidate,
      },
      cache: options?.cache,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Strapi API error [${endpoint}]:`, res.status, errorText);
      throw new Error(
        `Failed to fetch from ${endpoint}: ${res.status} ${res.statusText}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error(`Strapi fetch error [${endpoint}]:`, error);
    throw error;
  }
}
  */

export const STRAPI_CONFIG = {
  baseUrl: "https://sirius-strapi-qbx63.ondigitalocean.app/api",
  revalidate: 60,
} as const;

/**
 * Typy pro Strapi filtry
 */
type FilterOperator = {
  $eq?: string | number | boolean;
  $ne?: string | number | boolean;
  $lt?: number;
  $lte?: number;
  $gt?: number;
  $gte?: number;
  $in?: (string | number)[];
  $notIn?: (string | number)[];
  $contains?: string;
  $notContains?: string;
  $containsi?: string;
  $notContainsi?: string;
  $null?: boolean;
  $notNull?: boolean;
  $between?: [number, number];
  $startsWith?: string;
  $endsWith?: string;
};

type FilterValue = string | number | boolean | FilterOperator;

/**
 * Základní fetch funkce pro Strapi API
 */
export async function strapiRequest<T>(
  endpoint: string,
  options?: {
    populate?: Record<string, string> | string[];
    filters?: Record<string, FilterValue>;
    sort?: string[];
    pagination?: Record<string, number>;
    revalidate?: number;
    cache?: RequestCache;
  }
): Promise<T> {
  const url = new URL(`${STRAPI_CONFIG.baseUrl}/${endpoint}`);

  // Přidání populate parametrů
  if (options?.populate) {
    if (Array.isArray(options.populate)) {
      // Jednoduchý populate: ["field1", "field2"]
      options.populate.forEach((field) => {
        url.searchParams.append("populate", field);
      });
    } else {
      // Komplexní populate: { "field[populate]": "*" }
      Object.entries(options.populate).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
  }

  // Přidání filters
  if (options?.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        Object.entries(value).forEach(([operator, val]) => {
          url.searchParams.append(`filters[${key}][${operator}]`, String(val));
        });
      } else {
        url.searchParams.append(`filters[${key}]`, String(value));
      }
    });
  }

  // Přidání sort
  if (options?.sort) {
    options.sort.forEach((sortParam) => {
      url.searchParams.append("sort", sortParam);
    });
  }

  // Přidání pagination
  if (options?.pagination) {
    Object.entries(options.pagination).forEach(([key, value]) => {
      url.searchParams.append(`pagination[${key}]`, String(value));
    });
  }

  try {
    const res = await fetch(url.toString(), {
      next: {
        revalidate: options?.revalidate ?? STRAPI_CONFIG.revalidate,
      },
      cache: options?.cache,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Strapi API error [${endpoint}]:`, res.status, errorText);
      throw new Error(
        `Failed to fetch from ${endpoint}: ${res.status} ${res.statusText}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error(`Strapi fetch error [${endpoint}]:`, error);
    throw error;
  }
}