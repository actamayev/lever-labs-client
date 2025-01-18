const path = require("path")
const CracoEsbuildPlugin = require("craco-esbuild")
const webpack = require("webpack")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = {
	plugins: [
		{
			plugin: CracoEsbuildPlugin,
			options: {
				esbuildMinimizerOptions: {
					target: "es2015",
					css: true,
				},
			},
		},
	],
	webpack: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
		configure: (webpackConfig) => {
			// Basic fallbacks
			webpackConfig.resolve.fallback = {
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

			return webpackConfig
		},
		plugins: {
			add: [
				new webpack.DefinePlugin({
					"process.env": JSON.stringify(process.env),
				}),
				process.env.ANALYZE && new BundleAnalyzerPlugin({
					analyzerMode: "server",
					analyzerPort: 4000,
				}),
			].filter(Boolean),
		},
	},
	style: {
		postcss: {
			mode: "extends",
			loaderOptions: {
				postcssOptions: {
					plugins: [
						require("tailwindcss")({ config: "./tailwind.config.ts" }),
						require("autoprefixer"),
					],
				},
			},
		},
	},
}
