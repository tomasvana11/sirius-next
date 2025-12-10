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
      {
        protocol: "https",
        hostname: "sirius-strapi-qbx63.ondigitalocean.app",
        port: "",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "sirius-file-storage.fra1.cdn.digitaloceanspaces.com",
        port: "",
        pathname: "/sirius-file-storage/**",
      },
    ],
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
