import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  partialPrefetching: false,
  images: {
    loader: "custom",
    loaderFile: "./lib/static-image-loader.ts",
    deviceSizes: [640, 828, 1080, 1440, 1920],
    imageSizes: [320, 480],
  },
  experimental: {
    agentFeedback: true,
    globalNotFound: true,
  },
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
