import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // webpack(config, { isServer }) {
  //   if (isServer) {
  //     config.externals.push('mongoose'); // Exclude mongoose in client-side bundles
  //   }
  //   return config;
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com"
      }
    ]
  }
};

export default nextConfig;
