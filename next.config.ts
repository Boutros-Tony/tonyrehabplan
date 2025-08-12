import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Only add basePath on production (GitHub Pages)
  basePath: isProd ? "/tonyrehabplan" : undefined,
  assetPrefix: isProd ? "/tonyrehabplan/" : undefined,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
