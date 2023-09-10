/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://211.33.36.227:8081/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
