import type { NextConfig } from "next";

const isGh = process.env.NEXT_PUBLIC_BASE_PATH === "gh";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Add basePath only for GitHub Pages builds
  basePath: isGh ? "/tonyrehabplan" : undefined,
  assetPrefix: isGh ? "/tonyrehabplan/" : undefined,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
