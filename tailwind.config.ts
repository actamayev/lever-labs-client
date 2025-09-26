/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-require-imports */
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette")

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./src/**/*.{js,ts,jsx,tsx}", "./src/styles/**.css"
	],
	safelist: [
		// Ensure all Duolingo color variants are always included
		// Base colors
		"bg-macaw", "bg-cardinal", "bg-bee", "bg-fox", "bg-beetle", "bg-humpback", "bg-beakInner", "bg-chargingGreen",
		"text-macaw", "text-cardinal", "text-bee", "text-fox", "text-beetle", "text-humpback", "text-beakInner", "text-chargingGreen",
		"border-macaw", "border-cardinal", "border-bee", "border-fox", "border-beetle", "border-humpback", "border-beakInner", "border-chargingGreen",
		"ring-macaw", "ring-cardinal", "ring-bee", "ring-fox", "ring-beetle", "ring-humpback", "ring-beakInner", "ring-chargingGreen",

		// Variant 1 colors
		"bg-macaw-1", "bg-cardinal-1", "bg-bee-1", "bg-fox-1", "bg-beetle-1", "bg-humpback-1", "bg-beakInner-1", "bg-chargingGreen-1",
		"text-macaw-1", "text-cardinal-1", "text-bee-1", "text-fox-1", "text-dtle-1", "text-humpback-1", "text-beakInner-1", "text-chargingGreen-1",
		"border-macaw-1", "border-cardinal-1", "border-bee-1", "border-fox-1", "border-beetle-1", "border-humpback-1", "border-beakInner-1", "border-chargingGreen-1",
		"ring-macaw-1", "ring-cardinal-1", "ring-bee-1", "ring-fox-1", "ring-beetle-1", "ring-humpback-1", "ring-beakInner-1", "ring-chargingGreen-1",

		// Variant 2 colors
		"bg-macaw-2", "bg-cardinal-2", "bg-bee-2", "bg-fox-2", "bg-beetle-2", "bg-humpback-2", "bg-beakInner-2", "bg-chargingGreen-2",
		"text-macaw-2", "text-cardinal-2", "text-bee-2", "text-fox-2", "text-beetle-2", "text-humpback-2", "text-beakInner-2", "text-chargingGreen-2",
		"border-macaw-2", "border-cardinal-2", "border-bee-2", "border-fox-2", "border-beetle-2", "border-humpback-2", "border-beakInner-2", "border-chargingGreen-2",
		"ring-macaw-2", "ring-cardinal-2", "ring-bee-2", "ring-fox-2", "ring-beetle-2", "ring-humpback-2", "ring-beakInner-2", "ring-chargingGreen-2",

		// Variant 3 colors
		"bg-macaw-3", "bg-cardinal-3", "bg-bee-3", "bg-fox-3", "bg-beetle-3", "bg-humpback-3", "bg-beakInner-3", "bg-chargingGreen-3",
		"text-macaw-3", "text-cardinal-3", "text-bee-3", "text-fox-3", "text-beetle-3", "text-humpback-3", "text-beakInner-3", "text-chargingGreen-3",
		"border-macaw-3", "border-cardinal-3", "border-bee-3", "border-fox-3", "border-beetle-3", "border-humpback-3", "border-beakInner-3", "border-chargingGreen-3",
		"ring-macaw-3", "ring-cardinal-3", "ring-bee-3", "ring-fox-3", "ring-beetle-3", "ring-humpback-3", "ring-beakInner-3", "ring-chargingGreen-3",

		// Hover background colors
		"hover:bg-macaw", "hover:bg-cardinal", "hover:bg-bee", "hover:bg-fox", "hover:bg-beetle", "hover:bg-humpback", "hover:bg-beakInner", "hover:bg-chargingGreen",
		"hover:bg-macaw-1", "hover:bg-cardinal-1", "hover:bg-bee-1", "hover:bg-fox-1", "hover:bg-beetle-1", "hover:bg-humpback-1", "hover:bg-beakInner-1", "hover:bg-chargingGreen-1",
		"hover:bg-macaw-2", "hover:bg-cardinal-2", "hover:bg-bee-2", "hover:bg-fox-2", "hover:bg-beetle-2", "hover:bg-humpback-2", "hover:bg-beakInner-2", "hover:bg-chargingGreen-2",
		"hover:bg-macaw-3", "hover:bg-cardinal-3", "hover:bg-bee-3", "hover:bg-fox-3", "hover:bg-beetle-3", "hover:bg-humpback-3", "hover:bg-beakInner-3", "hover:bg-chargingGreen-3",

		// Shadow colors for buttons
		"shadow-macaw", "shadow-cardinal", "shadow-bee", "shadow-fox", "shadow-beetle", "shadow-humpback", "shadow-beakInner", "shadow-chargingGreen",
		"shadow-macaw-1", "shadow-cardinal-1", "shadow-bee-1", "shadow-fox-1", "shadow-beetle-1", "shadow-humpback-1", "shadow-beakInner-1", "shadow-chargingGreen-1",
		"shadow-macaw-2", "shadow-cardinal-2", "shadow-bee-2", "shadow-fox-2", "shadow-beetle-2", "shadow-humpback-2", "shadow-beakInner-2", "shadow-chargingGreen-2",
		"shadow-macaw-3", "shadow-cardinal-3", "shadow-bee-3", "shadow-fox-3", "shadow-beetle-3", "shadow-humpback-3", "shadow-beakInner-3", "shadow-chargingGreen-3",

		// iMessage colors
		"bg-iMessageBlue", "bg-iMessageGreen",
		"text-iMessageBlue", "text-iMessageGreen",
		"border-iMessageBlue", "border-iMessageGreen",
		"ring-iMessageBlue", "ring-iMessageGreen",
		"hover:bg-iMessageBlue", "hover:bg-iMessageGreen",
		"shadow-iMessageBlue", "shadow-iMessageGreen",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-lexend)", "sans-serif"],
			},
			colors: {
				background: "hsl(var(--background))",

				foreground: "hsl(var(--foreground))",

				standardBackground: "rgb(var(--standard-background))",
				// lightThemeBackground: "rgb(255, 255, 255)",
				// darkThemeBackground: "rgb(20, 31, 35)",

				standardBackgroundHover: "rgb(var(--standard-background-hover))",
				selectedSidebarButtonBackground: "rgb(var(--selected-sidebar-button-background))",
				// darkBackgroundHover: "rgb(32, 47, 54)",
				// lightBackgroundHover: "rgb(220, 244, 255)",

				selectedSidebarButtonBorder: "rgb(var(--selected-sidebar-button-border))",
				// selectedSidebarButtonBorderLight: "rgb(132, 216, 255)",
				// selectedSidebarButtonBorderDark: "rgb(63, 132, 167)",

				answerText: "rgb(52, 153, 214)",
				questionText: "rgb(var(--question-text))",
				lilypadBlueBackground: "rgb(var(--lilypad-blue-background))",
				// lilypadBlueBackground: "rgb(61, 176, 246)",

				sandboxOrange: "rgb(255, 112, 0)",
				labIconColor: "rgb(12, 175, 12)",

				landingOuterBorder: "rgb(var(--landing-outer-border))",
				landingDottedLine: "rgb(var(--landing-dotted-line))",

				chargingGreen: "rgb(var(--chargingGreen))",
				"chargingGreen-1": "rgb(var(--chargingGreen-1))",
				"chargingGreen-2": "rgb(var(--chargingGreen-2))",
				"chargingGreen-3": "rgb(var(--chargingGreen-3))",
				careerQuestYellow: "rgb(var(--career-quest-yellow))",

				/* Duolingo colors */
				eel: "rgb(var(--eel))",
				swan: "rgb(var(--swan))",
				hare: "rgb(var(--hare))",
				macaw: "rgb(var(--macaw))",
				"macaw-1": "rgb(var(--macaw-1))",
				"macaw-2": "rgb(var(--macaw-2))",
				"macaw-3": "rgb(var(--macaw-3))",
				cardinal: "rgb(var(--cardinal))",
				"cardinal-1": "rgb(var(--cardinal-1))",
				"cardinal-2": "rgb(var(--cardinal-2))",
				"cardinal-3": "rgb(var(--cardinal-3))",
				bee: "rgb(var(--bee))",
				"bee-1": "rgb(var(--bee-1))",
				"bee-2": "rgb(var(--bee-2))",
				"bee-3": "rgb(var(--bee-3))",
				fox: "rgb(var(--fox))",
				"fox-1": "rgb(var(--fox-1))",
				"fox-2": "rgb(var(--fox-2))",
				"fox-3": "rgb(var(--fox-3))",
				beetle: "rgb(var(--beetle))",
				"beetle-1": "rgb(var(--beetle-1))",
				"beetle-2": "rgb(var(--beetle-2))",
				"beetle-3": "rgb(var(--beetle-3))",
				wolf: "rgb(var(--wolf))",
				polar: "rgb(var(--polar))",
				humpback: "rgb(var(--humpback))",
				"humpback-1": "rgb(var(--humpback-1))",
				"humpback-2": "rgb(var(--humpback-2))",
				"humpback-3": "rgb(var(--humpback-3))",
				beakInner: "rgb(var(--beakInner))",
				"beakInner-1": "rgb(var(--beakInner-1))",
				"beakInner-2": "rgb(var(--beakInner-2))",
				"beakInner-3": "rgb(var(--beakInner-3))",
				iMessageBlue: "rgb(var(--iMessageBlue))",
				iMessageGreen: "rgb(var(--iMessageGreen))",

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
			boxShadow: {
				// Duolingo color shadows for buttons
				"macaw": "0 4px 0 0 rgb(var(--macaw-2))",
				"macaw-1": "0 4px 0 0 rgb(var(--macaw-1))",
				"macaw-2": "0 4px 0 0 rgb(var(--macaw-2))",
				"macaw-3": "0 4px 0 0 rgb(var(--macaw-3))",
				"cardinal": "0 4px 0 0 rgb(var(--cardinal-2))",
				"cardinal-1": "0 4px 0 0 rgb(var(--cardinal-1))",
				"cardinal-2": "0 4px 0 0 rgb(var(--cardinal-2))",
				"cardinal-3": "0 4px 0 0 rgb(var(--cardinal-3))",
				"bee": "0 4px 0 0 rgb(var(--bee-2))",
				"bee-1": "0 4px 0 0 rgb(var(--bee-1))",
				"bee-2": "0 4px 0 0 rgb(var(--bee-2))",
				"bee-3": "0 4px 0 0 rgb(var(--bee-3))",
				"fox": "0 4px 0 0 rgb(var(--fox-2))",
				"fox-1": "0 4px 0 0 rgb(var(--fox-1))",
				"fox-2": "0 4px 0 0 rgb(var(--fox-2))",
				"fox-3": "0 4px 0 0 rgb(var(--fox-3))",
				"beetle": "0 4px 0 0 rgb(var(--beetle-2))",
				"beetle-1": "0 4px 0 0 rgb(var(--beetle-1))",
				"beetle-2": "0 4px 0 0 rgb(var(--beetle-2))",
				"beetle-3": "0 4px 0 0 rgb(var(--beetle-3))",
				"humpback": "0 4px 0 0 rgb(var(--humpback-2))",
				"humpback-1": "0 4px 0 0 rgb(var(--humpback-1))",
				"humpback-2": "0 4px 0 0 rgb(var(--humpback-2))",
				"humpback-3": "0 4px 0 0 rgb(var(--humpback-3))",
				"beakInner": "0 4px 0 0 rgb(var(--beakInner-2))",
				"beakInner-1": "0 4px 0 0 rgb(var(--beakInner-1))",
				"beakInner-2": "0 4px 0 0 rgb(var(--beakInner-2))",
				"beakInner-3": "0 4px 0 0 rgb(var(--beakInner-3))",
				"chargingGreen": "0 4px 0 0 rgb(var(--chargingGreen-2))",
				"chargingGreen-1": "0 4px 0 0 rgb(var(--chargingGreen-1))",
				"chargingGreen-2": "0 4px 0 0 rgb(var(--chargingGreen-2))",
				"chargingGreen-3": "0 4px 0 0 rgb(var(--chargingGreen-3))",
				"iMessageBlue": "0 4px 0 0 rgb(var(--iMessageBlue))",
				"iMessageGreen": "0 4px 0 0 rgb(var(--iMessageGreen))",
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

		require("tailwindcss-animate"),
		addVariablesForColors
	]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addVariablesForColors({ addBase, theme }: any): void {
	const allColors = flattenColorPalette(theme("colors"))
	const excludeKeys = [
		"eel", "swan", "hare", "macaw", "cardinal", "bee", "fox", "beetle", "wolf", "polar", "humpback", "beakInner", "chargingGreen",
		"macaw-1", "macaw-2", "macaw-3",
		"cardinal-1", "cardinal-2", "cardinal-3",
		"bee-1", "bee-2", "bee-3",
		"fox-1", "fox-2", "fox-3",
		"beetle-1", "beetle-2", "beetle-3",
		"humpback-1", "humpback-2", "humpback-3",
		"beakInner-1", "beakInner-2", "beakInner-3",
		"chargingGreen-1", "chargingGreen-2", "chargingGreen-3",
		"iMessageBlue", "iMessageGreen"
	]
	const newVars = Object.fromEntries(
		Object.entries(allColors)
			.filter(([key]): boolean => !excludeKeys.includes(key))
			.map(([key, val]): [string, string] => [`--${key}`, val as string])
	)

	addBase({
		":root": newVars,
	})
}
