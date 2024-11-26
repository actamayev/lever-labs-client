// eslint-disable-next-line filenames/match-regex, no-undef, @typescript-eslint/no-var-requires
import defaultTheme from "tailwindcss/defaultTheme"
import aspectRatio from "@tailwindcss/aspect-ratio"

export const darkMode = "class" // Merge both configurations' dark mode settings
export const content = [
	"./src/**/*.{js,ts,jsx,tsx}", // Your content paths
	"app/**/*.{ts,tsx}",          // shadcn content paths
	"components/**/*.{ts,tsx}"    // shadcn content paths
]

export const theme = {
	extend: {
		// Merge font family settings
		fontFamily: {
			sans: ["Inter var", ...defaultTheme.fontFamily.sans],
		},
		// Merge background colors
		backgroundColor: {
			pipTheme: "rgb(0,61,165)",
			pipThemeHover: "rgb(0, 45, 130)",
			pipThemeDark: "rgb(226 232 240)",
			pipThemeDarkHover: "rgb(241 245 249)",
		},
		// Merge text colors
		textColor: {
			pipTheme: "rgb(0,61,165)",
		},
		// Extend shadcn colors
		colors: {
			border: "hsl(var(--border))",
			input: "hsl(var(--input))",
			ring: "hsl(var(--ring))",
			background: "hsl(var(--background))",
			foreground: "hsl(var(--foreground))",
			primary: {
				DEFAULT: "hsl(var(--primary))",
				foreground: "hsl(var(--primary-foreground))",
			},
			secondary: {
				DEFAULT: "hsl(var(--secondary))",
				foreground: "hsl(var(--secondary-foreground))",
			},
			destructive: {
				DEFAULT: "hsl(var(--destructive))",
				foreground: "hsl(var(--destructive-foreground))",
			},
			muted: {
				DEFAULT: "hsl(var(--muted))",
				foreground: "hsl(var(--muted-foreground))",
			},
			accent: {
				DEFAULT: "hsl(var(--accent))",
				foreground: "hsl(var(--accent-foreground))",
			},
			popover: {
				DEFAULT: "hsl(var(--popover))",
				foreground: "hsl(var(--popover-foreground))",
			},
			card: {
				DEFAULT: "hsl(var(--card))",
				foreground: "hsl(var(--card-foreground))",
			},
		},
		// Merge border radius
		borderRadius: {
			lg: "var(--radius)",
			md: "calc(var(--radius) - 2px)",
			sm: "calc(var(--radius) - 4px)",
		},
	},
}

export const plugins = [
	aspectRatio,               // Your plugins
	// eslint-disable-next-line no-undef, @typescript-eslint/no-require-imports
	require("tailwindcss-animate"), // shadcn plugins
]
