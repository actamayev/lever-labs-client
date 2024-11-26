const path = require("path")

module.exports = {
	webpack: {
		alias: {
			"@": path.resolve(__dirname, "src"),
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
