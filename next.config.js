/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://121.166.191.129:9876/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
