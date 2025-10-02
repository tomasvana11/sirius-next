// app/page.tsx

// Typy pro Strapi data
interface StrapiResponse<T> {
  data: T;
  meta: Record<string, any>;
}

interface Homepage {
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
      Url: string;
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
  Facts: any | null;
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

// Funkce pro fetch dat ze Strapi
async function getHomepageData(): Promise<Homepage> {
  try {
    const url = new URL(
      "https://sirius-strapi-qbx63.ondigitalocean.app/api/homepage"
    );

    url.searchParams.append("populate[HeroBanner][populate]", "*");
    url.searchParams.append(
      "populate[Numbers][populate][Number][populate]",
      "*"
    );
    url.searchParams.append("populate[appAdvantages][populate]", "*");
    url.searchParams.append(
      "populate[MissionClaim][populate][Mission][populate]",
      "*"
    );
    url.searchParams.append("populate[Facts][populate]", "*");
    url.searchParams.append("populate[Steps][populate][Step][populate]", "*");
    url.searchParams.append(
      "populate[Checks][populate][checkItem][populate]",
      "*"
    );

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error response:", errorText);
      throw new Error(`Failed to fetch homepage data: ${res.status}`);
    }

    const json: StrapiResponse<Homepage> = await res.json();
    return json.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export default async function HomePage() {
  const homepage = await getHomepageData();

  return (
    <div>
      <h1>Hero Banner</h1>
      <p>Title: {homepage.HeroBanner.Title}</p>
      <p>Description: {homepage.HeroBanner.Description}</p>
      {homepage.HeroBanner.heroBannerButton && (
        <p>Button URL: {homepage.HeroBanner.heroBannerButton.Url}</p>
      )}

      <h1>Numbers</h1>
      {homepage.Numbers.Number.map((item) => (
        <div key={item.id}>
          <p>Number: {item.Number[0]?.children[0]?.text}</p>
          <p>Description: {item.Description}</p>
        </div>
      ))}

      <h1>Mission Claim</h1>
      <p>{homepage.MissionClaim.Claim}</p>
      {homepage.MissionClaim.Mission?.map((mission) => (
        <div key={mission.id}>
          <p>Icon: {mission.Icon}</p>
          <p>Title: {mission.Title}</p>
          <p>Description: {mission.Description}</p>
        </div>
      ))}

      <h1>App Advantages</h1>
      <p>Title: {homepage.appAdvantages.Title}</p>
      <p>Description: {homepage.appAdvantages.Description}</p>

      <h1>Steps</h1>
      <p>{homepage.Steps.Title}</p>
      {homepage.Steps.Step.map((step) => (
        <div key={step.id}>
          <p>Icon: {step.Icon?.Icon}</p>
          <p>Title: {step.Title}</p>
          <p>Description: {step.Description}</p>
        </div>
      ))}

      <h1>Checks</h1>
      {homepage.Checks.checkItem.map((check) => (
        <p key={check.id}>{check.Content}</p>
      ))}
    </div>
  );
}
