// eslint-disable-next-line filenames/match-regex, no-undef, @typescript-eslint/no-var-requires
import defaultTheme from "tailwindcss/defaultTheme"
import aspectRatio from "@tailwindcss/aspect-ratio"

export const content = ["./src/**/*.{js,ts,jsx,tsx}"]
export const theme = {
	extend: {
		fontFamily: {
			sans: ["Inter var", ...defaultTheme.fontFamily.sans]
		},
		backgroundColor: {
			pipTheme: "rgb(0,61,165)",
			pipThemeHover: "rgb(0, 45, 130)",
			pipThemeDark: "rgb(226 232 240)",
			pipThemeDarkHover: "rgb(241 245 249)"
		},
		textColor: {
			pipTheme: "rgb(0,61,165)",
		}
	}
}
export const darkMode = "class"
export const plugins = [
	aspectRatio
]
