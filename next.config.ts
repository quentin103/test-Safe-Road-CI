import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  // Autorise le serveur de développement depuis un autre appareil du réseau local (http://192.168.100.x:3000).
  allowedDevOrigins: ["192.168.100.*"],
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
