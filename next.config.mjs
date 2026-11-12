let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  skipTrailingSlashRedirect: true,
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
      // SEO Redirect #1
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      // SEO Redirect #2
      {
        source: '/contact',
        destination: '/contact-us',
        permanent: true,
      },
      // SEO Redirect #3
      {
        source: '/thank_you',
        destination: '/contact-us',
        permanent: true,
      },
      // SEO Redirect #4
      {
        source: '/privacy',
        destination: '/data-privacy-policy',
        permanent: true,
      },
      // SEO Redirect #5
      {
        source: '/legal-information',
        destination: '/terms-of-use',
        permanent: true,
      },
      // SEO Redirect #6
      {
        source: '/company',
        destination: '/profile',
        permanent: true,
      },
      // SEO Redirect #7
      {
        source: '/identity',
        destination: '/profile',
        permanent: true,
      },
      // SEO Redirect #8
      {
        source: '/business',
        destination: '/portfolio',
        permanent: true,
      },
      // SEO Redirect #9
      {
        source: '/business/services',
        destination: '/portfolio',
        permanent: true,
      },
      // SEO Redirect #10
      {
        source: '/awards',
        destination: '/awards-and-recognitions',
        permanent: true,
      },
      // SEO Redirect #11
      {
        source: '/awards/details/37',
        destination: '/awards-and-recognitions',
        permanent: true,
      },
      // SEO Redirect #12
      {
        source: '/awards/details/38',
        destination: '/awards-and-recognitions',
        permanent: true,
      },
      // SEO Redirect #13
      {
        source: '/awards/details/39',
        destination: '/awards-and-recognitions',
        permanent: true,
      },
      // SEO Redirect #14
      {
        source: '/awards/details/33',
        destination: '/awards-and-recognitions',
        permanent: true,
      },
      // SEO Redirect #15
      {
        source: '/awards/details/31',
        destination: '/awards-and-recognitions',
        permanent: true,
      },
      // SEO Redirect #16
      {
        source: '/awards/details/30',
        destination: '/awards-and-recognitions',
        permanent: true,
      },
      // SEO Redirect #17
      {
        source: '/awards/details/29',
        destination: '/awards-and-recognitions',
        permanent: true,
      },
      // SEO Redirect #18
      {
        source: '/awards/details/12',
        destination: '/awards-and-recognitions',
        permanent: true,
      },
      // SEO Redirect #19
      {
        source: '/glass_bottling_plant',
        destination: '/portfolio/glass-bottling',
        permanent: true,
      },
      // SEO Redirect #20
      {
        source: '/application-view/drinking-water-fountains',
        destination: '/portfolio/zvr',
        permanent: true,
      },
      // SEO Redirect #21
      {
        source: '/application-view/drinking-water-stations',
        destination: '/portfolio/bluwae',
        permanent: true,
      },
      // SEO Redirect #22
      {
        source: '/ourgreenisblue',
        destination: '/perspectives',
        permanent: true,
      },
      // SEO Redirect #24
      {
        source: '/ourgreenisblue/water-technology',
        destination: '/perspectives/technology',
        permanent: true,
      },
      // SEO Redirect #25
      {
        source: '/ourgreenisblue/water-technology/15',
        destination: '/perspectives/technology',
        permanent: true,
      },
      // SEO Redirect #26
      {
        source: '/ourgreenisblue/water-technology/28',
        destination: '/perspectives/technology',
        permanent: true,
      },
      // SEO Redirect #27
      {
        source: '/ourgreenisblue/water-technology/104',
        destination: '/perspectives/technology',
        permanent: true,
      },
      // SEO Redirect #28
      {
        source: '/ourgreenisblue/water-scarcity',
        destination: '/perspectives/water-conservation',
        permanent: true,
      },
      // SEO Redirect #29
      {
        source: '/ourgreenisblue/water-scarcity/78',
        destination: '/perspectives/water-conservation',
        permanent: true,
      },
      // SEO Redirect #30
      {
        source: '/ourgreenisblue/environment',
        destination: '/perspectives/climate-change-water',
        permanent: true,
      },
      // SEO Redirect #31
      {
        source: '/ourgreenisblue/environment/105',
        destination: '/perspectives/climate-change-water',
        permanent: true,
      },
      // SEO Redirect #32
      {
        source: '/ourgreenisblue/environment/106',
        destination: '/perspectives/climate-change-water',
        permanent: true,
      },
      // SEO Redirect #33
      {
        source: '/ourgreenisblue/environment/107',
        destination: '/perspectives/climate-change-water',
        permanent: true,
      },
      // SEO Redirect #34
      {
        source: '/ourgreenisblue/water-pollution',
        destination: '/perspectives/water-conservation',
        permanent: true,
      },
      // SEO Redirect #35
      {
        source: '/ourgreenisblue/water-quality',
        destination: '/perspectives/water-conservation',
        permanent: true,
      },
      // SEO Redirect #36
      {
        source: '/ourgreenisblue/say-no-to-bottled-water',
        destination: '/activism',
        permanent: true,
      },
      // SEO Redirect #37
      {
        source: '/ourgreenisblue/say-no-to-bottled-water/9',
        destination: '/activism',
        permanent: true,
      },
      // SEO Redirect #38
      {
        source: '/ourgreenisblue/say-no-to-bottled-water/103',
        destination: '/activism',
        permanent: true,
      },
      // SEO Redirect #39
      {
        source: '/drinking-water-stations/63',
        destination: '/portfolio/bluwae',
        permanent: true,
      },
      // SEO Redirect #40
      {
        source: '/drinking-water-stations/27',
        destination: '/portfolio/bluwae',
        permanent: true,
      },
      // SEO Redirect #41
      {
        source: '/drinking-water-stations/97',
        destination: '/portfolio/bluwae',
        permanent: true,
      },
      // SEO Redirect #42
      {
        source: '/drinking-water-stations/62',
        destination: '/portfolio/bluwae',
        permanent: true,
      },
      // SEO Redirect #43
      {
        source: '/drinking-water-stations/58',
        destination: '/portfolio/bluwae',
        permanent: true,
      },
      // SEO Redirect #44
      {
        source: '/drinking-water-stations/57',
        destination: '/portfolio/bluwae',
        permanent: true,
      },
      // SEO Redirect #45
      {
        source: '/drinking-water-stations/35',
        destination: '/portfolio/bluwae',
        permanent: true,
      },
      // SEO Redirect #46
      {
        source: '/drinking-water-stations/34',
        destination: '/portfolio/bluwae',
        permanent: true,
      },
      // SEO Redirect #47
      {
        source: '/drinking-water-stations/33',
        destination: '/portfolio/bluwae',
        permanent: true,
      },
      // SEO Redirect #48
      {
        source: '/drinking-water-stations/32',
        destination: '/portfolio/bluwae',
        permanent: true,
      },
      // SEO Redirect #49
      {
        source: '/drinking-water-stations/31',
        destination: '/portfolio/bluwae',
        permanent: true,
      },
      // SEO Redirect #50
      {
        source: '/drinking-water-stations/25',
        destination: '/portfolio/bluwae',
        permanent: true,
      },
      // SEO Redirect #51
      {
        source: '/water-coolers/112',
        destination: '/portfolio/trublu',
        permanent: true,
      },
      // SEO Redirect #52
      {
        source: '/water-coolers/111',
        destination: '/portfolio/trublu',
        permanent: true,
      },
      // SEO Redirect #53
      {
        source: '/water-coolers/92',
        destination: '/portfolio/trublu',
        permanent: true,
      },
      // SEO Redirect #54
      {
        source: '/water-coolers/91',
        destination: '/portfolio/trublu',
        permanent: true,
      },
      // SEO Redirect #55
      {
        source: '/water-dispensers/87',
        destination: '/portfolio/trublu',
        permanent: true,
      },
      // SEO Redirect #56
      {
        source: '/water-dispensers/113',
        destination: '/portfolio/trublu',
        permanent: true,
      },
      // SEO Redirect #57
      {
        source: '/water-dispensers/108',
        destination: '/portfolio/trublu',
        permanent: true,
      },
      // SEO Redirect #58
      {
        source: '/water-dispensers/107',
        destination: '/portfolio/trublu',
        permanent: true,
      },
      // SEO Redirect #59
      {
        source: '/water-dispensers/88',
        destination: '/portfolio/trublu',
        permanent: true,
      },
      // SEO Redirect #60
      {
        source: '/drinking-water-taps/99',
        destination: '/portfolio/watermatic',
        permanent: true,
      },
      // SEO Redirect #61
      {
        source: '/drinking-water-taps/116',
        destination: '/portfolio/watermatic',
        permanent: true,
      },
      // SEO Redirect #62
      {
        source: '/drinking-water-taps/115',
        destination: '/portfolio/watermatic',
        permanent: true,
      },
      // SEO Redirect #63
      {
        source: '/drinking-water-taps/114',
        destination: '/portfolio/watermatic',
        permanent: true,
      },
      // SEO Redirect #64
      {
        source: '/drinking-water-taps/106',
        destination: '/portfolio/watermatic',
        permanent: true,
      },
      // SEO Redirect #65
      {
        source: '/drinking-water-taps/103',
        destination: '/portfolio/watermatic',
        permanent: true,
      },
      // SEO Redirect #66
      {
        source: '/drinking-water-taps/102',
        destination: '/portfolio/watermatic',
        permanent: true,
      },
      // SEO Redirect #67
      {
        source: '/drinking-water-taps/70',
        destination: '/portfolio/watermatic',
        permanent: true,
      },
      // SEO Redirect #68
      {
        source: '/bottle-filling-stations/83',
        destination: '/portfolio/zvr',
        permanent: true,
      },
      // SEO Redirect #69
      {
        source: '/bottle-filling-stations/95',
        destination: '/portfolio/zvr',
        permanent: true,
      },
      // SEO Redirect #70
      {
        source: '/bottle-filling-stations/94',
        destination: '/portfolio/zvr',
        permanent: true,
      },
      // SEO Redirect #71
      {
        source: '/drinking-water-fountains/76',
        destination: '/portfolio/zvr',
        permanent: true,
      },
      // SEO Redirect #72
      {
        source: '/drinking-water-fountains/110',
        destination: '/portfolio/zvr',
        permanent: true,
      },
      // SEO Redirect #73
      {
        source: '/drinking-water-fountains/54',
        destination: '/portfolio/zvr',
        permanent: true,
      },
      // SEO Redirect #74
      {
        source: '/drinking-water-fountains/49',
        destination: '/portfolio/zvr',
        permanent: true,
      },
      // SEO Redirect #75
      {
        source: '/drinking-water-fountains/17',
        destination: '/portfolio/zvr',
        permanent: true,
      },
      // SEO Redirect #76
      {
        source: '/water-chillers/85',
        destination: '/portfolio',
        permanent: true,
      },
      // SEO Redirect #77
      {
        source: '/water-chillers/84',
        destination: '/portfolio',
        permanent: true,
      },
      // SEO Redirect #78
      {
        source: '/industrial-equipment/68',
        destination: '/portfolio',
        permanent: true,
      },
      // SEO Redirect #79
      {
        source: '/industrial-equipment/67',
        destination: '/portfolio',
        permanent: true,
      },
      // SEO Redirect #80
      {
        source: '/industrial-equipment/66',
        destination: '/portfolio',
        permanent: true,
      },
      // SEO Redirect #81
      {
        source: '/industrial-equipment/65',
        destination: '/portfolio',
        permanent: true,
      },
      // SEO Redirect #82
      {
        source: '/career',
        destination: '/careers',
        permanent: true,
      },
      // SEO Redirect #83
      {
        source: '/csr',
        destination: '/sustainability',
        permanent: true,
      },
      // SEO Redirect #84
      {
        source: '/responsibility',
        destination: '/sustainability',
        permanent: true,
      },
      // SEO Redirect #85
      {
        source: '/events',
        destination: '/news-and-updates',
        permanent: true,
      },
      // SEO Redirect #86
      {
        source: '/social_media',
        destination: '/news-and-updates',
        permanent: true,
      },
      // SEO Redirect #87
      {
        source: '/people',
        destination: '/life-at-wae',
        permanent: true,
      },
      // SEO Redirect #88
      {
        source: '/Inside-wae',
        destination: '/profile',
        permanent: true,
      },
      // SEO Redirect #89
      {
        source: '/ambition',
        destination: '/profile',
        permanent: true,
      },
      // SEO Redirect #90
      {
        source: '/ethics',
        destination: '/compliance',
        permanent: true,
      },
      // SEO Redirect #91
      {
        source: '/quality',
        destination: '/compliance',
        permanent: true,
      },
      // SEO Redirect #92
      {
        source: '/partner',
        destination: '/contact-us',
        permanent: true,
      },
      // Extra Alias
      {
        source: '/privacy-policy',
        destination: '/data-privacy-policy',
        permanent: true,
      },
      // Extra Alias
      {
        source: '/terms',
        destination: '/terms-of-use',
        permanent: true,
      },
      // Extra Alias
      {
        source: '/terms-and-conditions',
        destination: '/terms-of-use',
        permanent: true,
      },
      // Extra Alias
      {
        source: '/glass-bottling-plant',
        destination: '/portfolio/glass-bottling',
        permanent: true,
      },
      // Extra Alias
      {
        source: '/about',
        destination: '/profile',
        permanent: true,
      },
      // Extra Alias
      {
        source: '/about-us',
        destination: '/profile',
        permanent: true,
      },
      // Extra Alias
      {
        source: '/careers-at-wae',
        destination: '/careers',
        permanent: true,
      },
      // Extra Alias
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
