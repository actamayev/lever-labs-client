// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Core settings
	reactStrictMode: true,
	poweredByHeader: false, // Remove X-Powered-By header for security
	compress: true, // Enable gzip compression

	// Performance optimizations
	// Note: swcMinify is now default in Next.js 15, so removed
	turbopack: {
		// Turbopack configuration (moved from experimental.turbo)
		rules: {
			"*.svg": {
				loaders: ["@svgr/webpack"],
				as: "*.js",
			},
		},
	},
	experimental: {
		scrollRestoration: true, // Better scroll restoration
	},

	// Compiler optimizations
	compiler: {
		// Remove console logs in production
		removeConsole: process.env.NODE_ENV === "production" ? {
			exclude: ["error", "warn"]
		} : false,
		// Remove React dev tools in production
		reactRemoveProperties: process.env.NODE_ENV === "production",
	},

	// Image optimization
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "blue-dot-robots-local-bucket.s3.us-east-1.amazonaws.com",
			},
			{
				protocol: "https",
				hostname: "blue-dot-robots-staging-bucket.s3.us-east-1.amazonaws.com",
			},
			{
				protocol: "https",
				hostname: "blue-dot-robots-production-bucket.s3.us-east-1.amazonaws.com",
			},
		],
		formats: ["image/webp", "image/avif"], // Use modern image formats
		minimumCacheTTL: 60 * 60 * 24 * 30, // Cache images for 30 days
		dangerouslyAllowSVG: false, // Security: disable SVG optimization
	},

	// Security headers
	// eslint-disable-next-line require-await
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=()",
					},
				],
			},
		]
	},


	webpack: (config, { dev, isServer }) => {
		// Fallbacks for Node.js modules
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

		// Production optimizations
		if (!dev && !isServer) {
			// Optimize chunks
			config.optimization = {
				...config.optimization,
				splitChunks: {
					...config.optimization.splitChunks,
					cacheGroups: {
						...config.optimization.splitChunks?.cacheGroups,
						vendor: {
							test: /[\\/]node_modules[\\/]/,
							name: "vendors",
							chunks: "all",
							maxSize: 244000, // 244kb chunks
						},
						common: {
							name: "common",
							minChunks: 2,
							priority: 10,
							reuseExistingChunk: true,
						},
					},
				},
			}
		}

		return config
	},
}

module.exports = withBundleAnalyzer(nextConfig)
