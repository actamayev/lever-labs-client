const path = require("path")
const CracoEsbuildPlugin = require("craco-esbuild")
const webpack = require("webpack")

module.exports = {
	plugins: [
		{
			plugin: CracoEsbuildPlugin,
			options: {
				esbuildMinimizerOptions: {
					target: "es2015",
					css: true, //  OptimizeCssAssetsWebpackPlugin being replaced by esbuild.
				},
			},
		},
	],
	webpack: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
		plugins: {
			add: [
				new webpack.DefinePlugin({
					process: { env: {}, browser: {} },
				}),
			],
		},
		configure: {
			resolve: {
				fallback: {
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
				},
			},
		},
	},
	style: {
		postcss: {
			mode: "extends", // This is important - it tells CRACO to extend existing PostCSS config
			loaderOptions: {
				postcssOptions: {
					plugins: [
						require("tailwindcss")({ config: "./tailwind.config.ts" }), // Explicitly point to your config
						require("autoprefixer"),
					],
				},
			},
		},
	},
}
