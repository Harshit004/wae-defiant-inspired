let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
  },
  compiler: {
    // Remove React properties in production
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  reactStrictMode: true,
  outputFileTracingIncludes: {
    '/api/admin/categories': ['./data/products.ts'],
    '/api/admin/categories/*': ['./data/products.ts'],
    '/api/admin/products': ['./data/products.ts'],
    '/api/admin/products/*': ['./data/products.ts'],
    '/api/admin/blogs': ['./data/blogs.ts'],
    '/api/admin/blogs/*': ['./data/blogs.ts'],
    '/api/homepage-blogs': ['./data/blogs.ts'],
  },
  async redirects() {
    return [
      {
        source: '/product-listing/:category',
        destination: '/portfolio/:category',
        permanent: true,
      },
      {
        source: '/product-description-page',
        has: [
          {
            type: 'query',
            key: 'product',
            value: 'aurela',
          },
        ],
        destination: '/portfolio/trublu/aurela',
        permanent: true,
      },
      {
        source: '/product-description-page',
        has: [
          {
            type: 'query',
            key: 'product',
            value: 'reva',
          },
        ],
        destination: '/portfolio/bluwae/reva',
        permanent: true,
      },
      {
        source: '/product-description-page',
        has: [
          {
            type: 'query',
            key: 'product',
            value: 'venus',
          },
        ],
        destination: '/portfolio/bluwae/venus',
        permanent: true,
      },
    ]
  },
}

async function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return nextConfig
  }
  // If the user has a webpack function in their config, merge it with ours
  if (userConfig.webpack) {
    const originalWebpack = userConfig.webpack
    userConfig.webpack = (config, options) => {
      return originalWebpack(nextConfig.webpack(config, options), options)
    }
  }
  return { ...nextConfig, ...userConfig }
}

export default mergeConfig(nextConfig, userConfig?.default || userConfig)
