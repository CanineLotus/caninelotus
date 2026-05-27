import type { NextConfig } from "next";

const defaultProductionBasePath =
  process.env.NODE_ENV === "production" ? "/caninelotus" : "";

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? defaultProductionBasePath;

const nextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
} satisfies NextConfig;

export default nextConfig;
