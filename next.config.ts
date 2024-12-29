import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/dev-api/:path*",
          destination: "http://localhost:8080/:path*",
        },
      ];
    }

    return [];
  },
};

export default nextConfig;
