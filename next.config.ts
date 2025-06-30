import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/FilmFinder/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/FilmFinder' : ''
};

export default nextConfig;
