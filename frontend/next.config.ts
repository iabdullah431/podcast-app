/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/search",
        destination: "http://localhost:3001/api/search",
      },
    ];
  },
  images: {
    domains: ["is1-ssl.mzstatic.com", "anchor.fm", "feeds.buzzsprout.com"],
  },
};

module.exports = nextConfig;
