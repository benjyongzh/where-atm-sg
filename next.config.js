/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  env: {
    GMAPS_API_KEY: process.env.GMAPS_API_KEY,
    NEXT_PUBLIC_GMAPS_MAP_ID_LIGHT: process.env.NEXT_PUBLIC_GMAPS_MAP_ID_LIGHT,
  },
};

module.exports = nextConfig;
