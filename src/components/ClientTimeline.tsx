/*
// components/ClientTimeline.tsx
import Icon from "@/components/Icon";
import Image from "next/image";
import { Title } from "@/components/Title";

interface TimelineItem {
  id: number;
  Title: string;
  Description: string;
  Icon: string | null;
}

interface SideLabel {
  id: number;
  Text: string;
  Icon: string;
}

interface BackgroundImage {
  url: string;
  alternativeText: string | null;
}

interface ClientTimelineProps {
  data: {
    Title: string;
    Description: string;
    TimelineItem: TimelineItem[];
    backgroundImage: BackgroundImage;
    sideLabel: SideLabel[];
  };
}

export function ClientTimeline({ data }: ClientTimelineProps) {
  const baseUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "https://sirius-strapi-qbx63.ondigitalocean.app";

  return (
    <section className="relative  rounded-xl overflow-hidden p-4 md:p-8 bg-[#EC4C19]">
      <div className="absolute inset-0 z-0">
        <Image
          src={`${baseUrl}${data.backgroundImage.url}`}
          alt={data.backgroundImage.alternativeText || "Client background"}
          fill
          className="object-cover object-top md:object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#EC4C19]/85 to-[#EC4C19]/15" />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="text-white order-1 lg:order-1">
            <Title as="h2" className="text-white mb-6">
              {data.Title}
            </Title>
            <p className="text-lg lg:text-xl leading-relaxed mb-8">
              {data.Description}
            </p>

            <div className="hidden lg:block space-y-4 max-w-md">
              {data.sideLabel.map((label) => (
                <div
                  key={label.id}
                  className="bg-[#220B03]/80 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="bg-[#EC4C19] rounded-lg p-3 flex-shrink-0">
                    <Icon name={label.Icon} size="M" className="text-white" />
                  </div>
                  <p className="text-sm lg:text-base">{label.Text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-2xl p-8 lg:p-10 order-2 lg:order-2">
            <div className="space-y-8">
              {data.TimelineItem.map((item, index) => (
                <div key={item.id} className="relative">
                  {index < data.TimelineItem.length - 1 && (
                    <div className="absolute left-6 top-14 w-0.5 h-full bg-neutral-300" />
                  )}

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 relative z-10">
                      <div className="bg-[#EC4C19] rounded-full p-3">
                        <Icon
                          name={item.Icon || "diamond"}
                          size="M"
                          className="text-white"
                        />
                      </div>
                    </div>

                    <div className="flex-1 pb-4">
                      <Title as="h4" className="mb-2">
                        {item.Title}
                      </Title>
                      <p className="text-gray-600 text-base leading-relaxed">
                        {item.Description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:hidden space-y-4 order-3">
            {data.sideLabel.map((label) => (
              <div
                key={label.id}
                className="bg-[#220B03]/80 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4"
              >
                <div className="bg-[#EC4C19] rounded-lg p-3 flex-shrink-0">
                  <Icon name={label.Icon} size="M" className="text-white" />
                </div>
                <p className="text-sm">{label.Text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
*/
// components/ClientTimeline.tsx
import Icon from "@/components/Icon";
import Image from "next/image";
import { Title } from "@/components/Title";

interface TimelineItem {
  id: number;
  Title: string;
  Description: string;
  Icon: string | null;
}

interface SideLabel {
  id: number;
  Text: string;
  Icon: string;
}

interface BackgroundImage {
  url: string;
  alternativeText: string | null;
}

interface ClientTimelineProps {
  data: {
    Title: string;
    Description: string;
    TimelineItem: TimelineItem[];
    backgroundImage: BackgroundImage | null;
    sideLabel: SideLabel[];
  };
}

export function ClientTimeline({ data }: ClientTimelineProps) {
  const baseUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "https://sirius-strapi-qbx63.ondigitalocean.app";

  return (
    <section className="relative rounded-xl overflow-hidden p-4 md:p-8 bg-[#EC4C19]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {data.backgroundImage?.url ? (
          <>
            <Image
              src={data.backgroundImage.url}
              alt={data.backgroundImage.alternativeText || "Client background"}
              fill
              className="object-cover object-top md:object-center"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#EC4C19]/85 to-[#EC4C19]/15" />
          </>
        ) : (
          /* Fallback pokud není obrázek */
          <div className="absolute inset-0 bg-[#EC4C19]" />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Title and Description */}
          <div className="text-white order-1 lg:order-1">
            <Title as="h2" className="text-white mb-6">
              {data.Title}
            </Title>
            <p className="text-lg lg:text-xl leading-relaxed mb-8">
              {data.Description}
            </p>

            {/* Side Labels - Desktop only */}
            <div className="hidden lg:block space-y-4 max-w-md">
              {data.sideLabel.map((label) => (
                <div
                  key={label.id}
                  className="bg-[#220B03]/80 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="bg-[#EC4C19] rounded-lg p-3 flex-shrink-0">
                    <Icon name={label.Icon} size="M" className="text-white" />
                  </div>
                  <p className="text-sm lg:text-base">{label.Text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Timeline Steps */}
          <div className="bg-white rounded-lg shadow-2xl p-8 lg:p-10 order-2 lg:order-2">
            <div className="space-y-8">
              {data.TimelineItem.map((item, index) => (
                <div key={item.id} className="relative">
                  {/* Timeline connector line */}
                  {index < data.TimelineItem.length - 1 && (
                    <div className="absolute left-6 top-14 w-0.5 h-full bg-neutral-300" />
                  )}

                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 relative z-10">
                      <div className="bg-[#EC4C19] rounded-full p-3">
                        <Icon
                          name={item.Icon || "diamond"}
                          size="M"
                          className="text-white"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-4">
                      <Title as="h4" className="mb-2">
                        {item.Title}
                      </Title>
                      <p className="text-gray-600 text-base leading-relaxed">
                        {item.Description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side Labels - Mobile only (below white box) */}
          <div className="lg:hidden space-y-4 order-3">
            {data.sideLabel.map((label) => (
              <div
                key={label.id}
                className="bg-[#220B03]/80 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4"
              >
                <div className="bg-[#EC4C19] rounded-lg p-3 flex-shrink-0">
                  <Icon name={label.Icon} size="M" className="text-white" />
                </div>
                <p className="text-sm">{label.Text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
