/*
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
};

export default nextConfig;
*/

/*
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sirius-strapi-qbx63.ondigitalocean.app',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
*/

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Obrázky ze Strapi (kdyby někdy byly hostované přímo tam)
      {
        protocol: "https",
        hostname: "sirius-strapi-qbx63.ondigitalocean.app",
        port: "",
        pathname: "/uploads/**",
      },
      // Obrázky z DigitalOcean Spaces CDN
      {
        protocol: "https",
        hostname: "sirius-file-storage.fra1.cdn.digitaloceanspaces.com",
        port: "",
        pathname: "/sirius-file-storage/**",
      },
    ],
  },
};

export default nextConfig;
