/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
	  domains: [], // Add any image domains you need
	},
	webpack: (config) => {
	  // Carry over your fallbacks from craco.config.js
	  config.resolve.fallback = {
		fs: false,
		tls: false,
		net: false,
		path: false,
		zlib: false,
		http: false,
		https: false,
		stream: false,
		crypto: false,
		buffer: false,
	  };
  
	  // Bundle analyzer (same as in your craco config)
	  if (process.env.ANALYZE === 'true') {
		const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
		config.plugins.push(
		  new BundleAnalyzerPlugin({
			analyzerMode: 'server',
			analyzerPort: 4000,
		  })
		);
	  }
  
	  return config;
	},
	// Note: Don't use the env property for environment variables
	// Use .env files instead
  };
  
  module.exports = nextConfig;