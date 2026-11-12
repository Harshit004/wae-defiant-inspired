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
    '/api/admin/news-events': ['./data/news-events.json'],
    '/api/news-events': ['./data/news-events.json'],
    '/news-and-updates': ['./data/news-events.json'],
    '/awards-and-recognitions': ['./data/news-events.json'],
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
      // Legacy redirects (Fix 6)
      {
        source: '/contact',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: '/data-privacy-policy',
        permanent: true,
      },
      {
        source: '/privacy-policy',
        destination: '/data-privacy-policy',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/terms-of-use',
        permanent: true,
      },
      {
        source: '/terms-and-conditions',
        destination: '/terms-of-use',
        permanent: true,
      },
      {
        source: '/awards',
        destination: '/awards-and-recognitions',
        permanent: true,
      },
      {
        source: '/ourgreenisblue',
        destination: '/sustainability',
        permanent: true,
      },
      {
        source: '/water-dispensers',
        destination: '/portfolio/bluwae',
        permanent: true,
      },
      {
        source: '/water-coolers',
        destination: '/portfolio/bluwae',
        permanent: true,
      },
      {
        source: '/bottle-filling-stations',
        destination: '/portfolio/bluwae',
        permanent: true,
      },
      {
        source: '/drinking-water-fountains',
        destination: '/portfolio/trublu',
        permanent: true,
      },
      {
        source: '/glass_bottling_plant',
        destination: '/portfolio/glass-bottling',
        permanent: true,
      },
      {
        source: '/glass-bottling-plant',
        destination: '/portfolio/glass-bottling',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/profile',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/profile',
        permanent: true,
      },
      {
        source: '/careers-at-wae',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/news',
        destination: '/news-and-updates',
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
