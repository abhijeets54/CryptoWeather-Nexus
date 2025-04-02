/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable strict mode to prevent double rendering
  images: {
    domains: ['assets.coincap.io', 'www.cryptocompare.com', 'static.coincap.io', 'openweathermap.org'],
    unoptimized: process.env.NODE_ENV === 'development', // Only optimize images in production
  },
  // Add custom webpack config to handle WebSocket issues
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
      };
    }
    return config;
  },
  // Experimental features
  experimental: {
    // Only use stable features
    scrollRestoration: true,
  },
  // Enable SWC minification for better performance
  swcMinify: true,
  // Vercel-specific optimizations
  poweredByHeader: false, // Remove X-Powered-By header
  compress: true, // Enable compression
  productionBrowserSourceMaps: false, // Disable source maps in production for better performance
  // Configure headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
