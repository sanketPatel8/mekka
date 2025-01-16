/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "xcoder.a2hosted.com",
      },
      {
        hostname: "new-uat.mekkabooking.com",
      },
    ],
  },
  reactStrictMode: false,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = nextConfig;
