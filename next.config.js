/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'blue-dot-robots-local-bucket.s3.us-east-1.amazonaws.com',
			},
			{
				protocol: 'https',
				hostname: 'blue-dot-robots-staging-bucket.s3.us-east-1.amazonaws.com',
			},
			{
				protocol: 'https',
				hostname: 'blue-dot-robots-production-bucket.s3.us-east-1.amazonaws.com',
			},
		],
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
		}

		if (process.env.ANALYZE === "true") {
			// eslint-disable-next-line @typescript-eslint/no-require-imports
			const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
			config.plugins.push(
				new BundleAnalyzerPlugin({
					analyzerMode: "server",
					analyzerPort: 4000,
				})
			)
		}

		return config
	},
}

module.exports = nextConfig
