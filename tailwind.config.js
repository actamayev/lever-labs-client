// eslint-disable-next-line filenames/match-regex, no-undef, @typescript-eslint/no-var-requires
import defaultTheme from "tailwindcss/defaultTheme"
import aspectRatio from "@tailwindcss/aspect-ratio"

export const content = ["./src/**/*.{js,ts,jsx,tsx}"]
export const theme = {
	extend: {
		fontFamily: {
			sans: ["Inter var", ...defaultTheme.fontFamily.sans]
		},
	}
}
export const darkMode = "class"
export const plugins = [
	aspectRatio
]
