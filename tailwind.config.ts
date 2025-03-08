/* eslint-disable filenames/match-regex */
/* eslint-disable @typescript-eslint/no-require-imports */
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette")

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./src/**/*.{js,ts,jsx,tsx}", "./src/styles/**.css"
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Lexend", "sans-serif"],
			},
			colors: {
				background: "hsl(var(--background))",
				pipTheme: "rgb(0, 61, 165)",
				pipThemeHover: "rgb(0, 45, 130)",
				pipThemeOffWhite: "rgb(226, 232, 240)",
				pipThemeOffWhiteHover: "rgb(200, 210, 220)",

				foreground: "hsl(var(--foreground))",

				standardBackground: "rgb(var(--standard-background))",
				// lightThemeBackground: "rgb(255, 255, 255)",
				// darkThemeBackground: "rgb(20, 31, 35)",

				disabledLilypadBackground: "rgb(var(--disabled-lilypad-background))",
				// lilypadDarkBackground: "rgb(55, 70, 79)",
				// lilypadLightBackgroundDisabled: "rgb(229, 229, 229)",

				disabledLilypadIcon: "rgb(var(--disabled-lilypad-icon))",
				// lilypadIconDisabledDark: "rgb(82, 100, 109)",
				// lilypadIconDisabledLight: "rgb(175, 175, 175)",

				standardBackgroundHover: "rgb(var(--standard-background-hover))",
				// darkBackgroundHover: "rgb(32, 47, 54)",
				// lightBackgroundHover: "rgb(220, 244, 255)",

				selectedSidebarButtonBorder: "rgb(var(--selected-sidebar-button-border))",
				// selectedSidebarButtonBorderLight: "rgb(132, 216, 255)",
				// selectedSidebarButtonBorderDark: "rgb(63, 132, 167)",

				sidebarButtonHover: "rgb(var(--sidebar-button-hover))",
				// sidebarButtonHoverDark: "rgb(32, 47, 54)",
				// sidebarButtonHoverLight: "rgb(247, 247, 247)",

				answerText: "rgb(52, 153, 214)",

				lilypadBlueBackground: "rgb(var(--lilypad-blue-background))",
				// lilypadBlueBackground: "rgb(61, 176, 246)",

				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))"
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))"
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))"
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))"
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))"
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))"
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))"
				},
				custom: {
					green: "#438361"
				},
				"color-1": "hsl(var(--color-1))",
				"color-2": "hsl(var(--color-2))",
				"color-3": "hsl(var(--color-3))",
				"color-4": "hsl(var(--color-4))",
				"color-5": "hsl(var(--color-5))"
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0"
					},
					to: {
						height: "var(--radix-accordion-content-height)"
					}
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)"
					},
					to: {
						height: "0"
					}
				},
				slide: {
					"0%, 15%, 100%": {
						transform: "translateX(0)",
						color: "#ffffff"
					},
					"35%, 65%": {
						transform: "translateX(1rem)",
						color: "#438361"
					},
					"85%": {
						transform: "translateX(0)",
						color: "#ffffff"
					}
				},
				float: {
					"0%": {
						transform: "translateY(-50px) rotate(-12deg)"
					},
					"50%": {
						transform: "translateY(50px) rotate(5deg)"
					},
					"100%": {
						transform: "translateY(-50px) rotate(-12deg)"
					}
				},
				slideBoxes: {
					"0%": {
						transform: "translateX(0)"
					},
					"100%": {
						transform: "translateX(-130%)"
					}
				},
				bobbing: {
					"0%, 100%": {
						transform: "translateY(0)"
					},
					"50%": {
						transform: "translateY(-30px)"
					}
				},
				rainbow: {
					"0%": {
						"background-position": "0%"
					},
					"100%": {
						"background-position": "200%"
					},
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				rainbow: "rainbow var(--speed, 2s) infinite linear"
			}
		}
	},
	plugins: [
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		require("tailwindcss-animate"),
		addVariablesForColors
	],
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
function addVariablesForColors({ addBase, theme }: any): void {
	const allColors = flattenColorPalette(theme("colors"))
	const newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	)

	addBase({
		":root": newVars,
	})
}
