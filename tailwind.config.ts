import type { Config } from "tailwindcss"

const config: Config = {
	darkMode: "class",
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
		"./app/**/*.{js,ts,jsx,tsx}",
		"./src/styles/**/*.css"
	],
	theme: {
		extend: {
			screens: {
				"xs": "475px",
				"wide": "1900px",
			},
			maxWidth: {
				"9xl": "1536px",
			},
			fontFamily: {
				sans: ["var(--font-lexend)", "sans-serif"],
				heading: ["var(--font-lexend)", "sans-serif"], // Add your heading font here if different
			},
			colors: {
				// shadcn-compatible base colors
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",

				// Your custom application colors
				standardBackground: "rgb(var(--standard-background))",
				standardBackgroundHover: "rgb(var(--standard-background-hover))",
				selectedSidebarButtonBackground: "rgb(var(--selected-sidebar-button-background))",
				selectedSidebarButtonBorder: "rgb(var(--selected-sidebar-button-border))",

				answerText: "rgb(52, 153, 214)",
				questionText: "rgb(var(--question-text))",
				lilypadBlueBackground: "rgb(var(--lilypad-blue-background))",

				sandboxOrange: "rgb(255, 112, 0)",
				labIconColor: "rgb(12, 175, 12)",

				landingOuterBorder: "rgb(var(--landing-outer-border))",
				landingDottedLine: "rgb(var(--landing-dotted-line))",

				// Status colors
				"charging-green": "rgb(var(--charging-green))",
				"charging-green-1": "rgb(var(--charging-green-1))",
				"charging-green-2": "rgb(var(--charging-green-2))",
				"charging-green-3": "rgb(var(--charging-green-3))",
				careerQuestYellow: "rgb(var(--career-quest-yellow))",
				"lever-yellow": "rgb(var(--lever-yellow))",
				"lever-blue": "rgb(var(--lever-blue))",
				"lever-red": "rgb(var(--lever-red))",
				"question-correct-green": "rgb(var(--question-correct-green))",
				"question-correct-green-1": "rgb(var(--question-correct-green-1))",
				"question-correct-green-2": "rgb(var(--question-correct-green-2))",
				"question-correct-green-3": "rgb(var(--question-correct-green-3))",
				"question-incorrect-red": "rgb(var(--question-incorrect-red))",
				"question-incorrect-red-2": "rgb(var(--question-incorrect-red-2))",

				// Duolingo color palette
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
				"beak-inner": "rgb(var(--beak-inner))",
				"beak-inner-1": "rgb(var(--beak-inner-1))",
				"beak-inner-2": "rgb(var(--beak-inner-2))",
				"beak-inner-3": "rgb(var(--beak-inner-3))",
				iMessageBlue: "rgb(var(--iMessageBlue))",
				iMessageGreen: "rgb(var(--iMessageGreen))",

				// shadcn component colors
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
				"beak-inner": "0 4px 0 0 rgb(var(--beak-inner-2))",
				"beak-inner-1": "0 4px 0 0 rgb(var(--beak-inner-1))",
				"beak-inner-2": "0 4px 0 0 rgb(var(--beak-inner-2))",
				"beak-inner-3": "0 4px 0 0 rgb(var(--beak-inner-3))",
				"charging-green": "0 4px 0 0 rgb(var(--charging-green-2))",
				"charging-green-1": "0 4px 0 0 rgb(var(--charging-green-1))",
				"charging-green-2": "0 4px 0 0 rgb(var(--charging-green-2))",
				"charging-green-3": "0 4px 0 0 rgb(var(--charging-green-3))",
				"question-correct-green": "0 4px 0 0 rgb(var(--question-correct-green-2))",
				"question-correct-green-1": "0 4px 0 0 rgb(var(--question-correct-green-1))",
				"question-correct-green-2": "0 4px 0 0 rgb(var(--question-correct-green-2))",
				"question-correct-green-3": "0 4px 0 0 rgb(var(--question-correct-green-3))",
				"lever-yellow": "0 4px 0 0 rgb(220 200 0)",
				"lever-blue": "0 4px 0 0 rgb(0 90 160)",
				"lever-red": "0 4px 0 0 rgb(200 50 30)",
				"iMessageBlue": "0 4px 0 0 rgb(var(--iMessageBlue))",
				"iMessageGreen": "0 4px 0 0 rgb(var(--iMessageGreen))",
			},
			borderRadius: {
				xl: "calc(var(--radius) + 4px)",
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
				"caret-blink": {
					"0%,70%,100%": { opacity: "1" },
					"20%,50%": { opacity: "0" },
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
				rainbow: "rainbow var(--speed, 2s) infinite linear",
				"caret-blink": "caret-blink 1.25s ease-out infinite",
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/container-queries"),
	],
}

export default config
