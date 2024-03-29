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
    GMAPS_MAP_ID_LIGHT: process.env.GMAPS_MAP_ID_LIGHT,
  },
};

module.exports = nextConfig;
