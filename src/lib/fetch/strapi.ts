// lib/fetch/strapi.ts

export async function getCareerTimeline() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/career?populate[careerTimeline][populate]=*`,
    {
      next: { revalidate: 60 }, // Cache na 60 sekund
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch career timeline");
  }
  const data = await res.json();
  return data.data.careerTimeline;
}

export async function getClientTimeline() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/client?populate[ClientTimeline][populate]=*`,
    {
      next: { revalidate: 60 }, // Cache na 60 sekund
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch client timeline");
  }
  const data = await res.json();
  return data.data.ClientTimeline;
}