/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  transpilePackages: ["openbook-v2"],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
}

module.exports = nextConfig;
