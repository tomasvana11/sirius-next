/*
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
};

export default nextConfig;
*/

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