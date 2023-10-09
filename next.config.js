/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack5: true,
  webpack: config => {
    config.resolve.fallback = {
      fs: false,
    };

    return config;
  },
  // reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.emesoft.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig

