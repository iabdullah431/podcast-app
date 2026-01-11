/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const BACKEND = isProd
  ? "https://podcast-app-euyh.vercel.app"
  : "http://localhost:3001";

const nextConfig = {
  outputFileTracingRoot: process.cwd(),
  async rewrites() {
    return [
      { source: "/api/search", destination: `${BACKEND}/api/search` },
      {
        source: "/api/search/:path*",
        destination: `${BACKEND}/api/search/:path*`,
      },
    ];
  },
  images: {
    domains: ["is1-ssl.mzstatic.com", "anchor.fm", "feeds.buzzsprout.com"],
  },
};
module.exports = nextConfig;
