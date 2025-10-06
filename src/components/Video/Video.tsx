/*
// components/Video/Video.tsx
import React from "react";
import { cn } from "@/lib/utils";
import type { VideoProps } from "./Video.types";

export const Video: React.FC<VideoProps> = ({ url, videoId, className }) => {
  // Extrahuje video ID z YouTube URL
  const getYouTubeId = (url: string): string | null => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  const finalVideoId = videoId || (url ? getYouTubeId(url) : null);

  if (!finalVideoId) {
    return (
      <div className="w-full max-w-[800px] mx-auto p-8 bg-neutral-100 rounded-xl">
        <p className="text-neutral-500 text-center">
          Video nelze načíst. URL: {url || "není zadáno"}
        </p>
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-[800px] mx-auto", className)}>
      <div
        className="relative w-full rounded-xl overflow-hidden"
        style={{ paddingBottom: "62.5%" }}
      >
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${finalVideoId}`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};
*/

// components/Video/Video.tsx
import React from "react";
import { cn } from "@/lib/utils";
import type { VideoProps } from "./Video.types";

export const Video: React.FC<VideoProps> = ({ url, videoId, className }) => {
  // Funkce pro extrakci YouTube ID z URL
  const getYouTubeId = (url: string): string | null => {
    const regex =
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const finalVideoId = videoId || (url ? getYouTubeId(url) : null);

  if (!finalVideoId) {
    return (
      <div className="w-full max-w-[800px] mx-auto p-8 bg-neutral-100 rounded-xl">
        <p className="text-neutral-500 text-center">
          Video nelze načíst. URL: {url || "není zadáno"}
        </p>
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-[800px] mx-auto", className)}>
      <div
        className="relative w-full rounded-xl overflow-hidden"
        style={{ paddingBottom: "62.5%" }}
      >
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${finalVideoId}`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};
