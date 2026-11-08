import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactCompiler: true,
  images: { remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-*" }] },
  async redirects() {
    return [
      { source: "/:path*", has: [{ type: "host", value: "restrova.com" }], destination: "https://www.restrova.com/:path*", permanent: true },
      // TLS is terminated by the hosting proxy. Do not redirect localhost/preview traffic.
      { source: "/:path*", has: [{ type: "host", value: "www.restrova.com" }, { type: "header", key: "x-forwarded-proto", value: "http" }], destination: "https://www.restrova.com/:path*", permanent: true },
    ];
  },
  async headers() {
    return process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production"
      ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }]
      : [];
  },
};
export default nextConfig;
