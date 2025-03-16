import { NextConfig } from "next"

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [], // Add any image domains you need
	},
	webpack: (config: NextConfig): NextConfig => {
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
