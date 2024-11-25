/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const path = require("path")

module.exports = {
	webpack: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
}
