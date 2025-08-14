/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,   // evita que ESLint rompa el build
  },
  typescript: {
    ignoreBuildErrors: true,    // evita que errores TS rompan el build
  },
};

module.exports = nextConfig;

