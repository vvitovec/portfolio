import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  trailingSlash: false,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    localPatterns: [
      {
        pathname: "/images/profile/**",
        search: "?v=20260319",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.vvitovec.com",
        pathname: "/_projects/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
