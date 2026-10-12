import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  output: "standalone",
  // Highlights unsafe lifecycles and double-invokes effects in dev
  reactStrictMode: true,

  // Remove the "X-Powered-By: Next.js" header
  poweredByHeader: false,

  // gzip responses (disable if a proxy/CDN already compresses)
  compress: true,

  // Smaller Docker image: copies only the files needed to run
  // output: "standalone",

  // next/image: allowed remote hosts and formats
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picperf.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "randomimageurl.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },

  // Redirects (URL changes in the browser)
  async redirects() {
    return [
      { source: "/old-users", destination: "/users", permanent: true }, // 308
      { source: "/blog/:slug", destination: "/posts/:slug", permanent: false }, // 307
    ];
  },

  // Rewrites (URL stays the same, content comes from elsewhere)
  async rewrites() {
    return [
      {
        source: "/api/external/:path*",
        destination: "https://api.example.com/:path*",
      },
    ];
  },

  // Custom response headers, including basic security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Long-lived caching for static assets you control
        source: "/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Typed links: catches wrong hrefs at compile time
  typedRoutes: true,

  experimental: {
    // Only bundle the icons/functions you actually import
    optimizePackageImports: ["lucide-react", "date-fns"],
  },

  // Log fetch calls in dev
  logging: {
    fetches: { fullUrl: true },
  },
};

export default withBundleAnalyzer(nextConfig);
