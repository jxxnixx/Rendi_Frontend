/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://20.249.3.253:8000/:path*",
      },
    ];
  },
};
const withImages = require("next-images");
module.exports = withImages();

module.exports = nextConfig;
