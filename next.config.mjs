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
    // Enable new JSX transform
    reactRoot: true,
  },
  compiler: {
    // Remove React properties in production
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  reactStrictMode: true,
  // Enable SWC minification
  swcMinify: true,
  // Configure SWC for React 19
  compilerOptions: {
    jsx: 'automatic',
    jsxImportSource: 'react',
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
