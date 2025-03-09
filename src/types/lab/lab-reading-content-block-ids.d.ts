declare global {
	type LEDReadingBlockID =
	| `intro-to-leds-${number}`
	| `voltage-${number}`
	| `rgb-leds-${number}`
	| `intro-to-code-${number}`
	| `leds-and-loops-${number}`
	| `advantages-of-leds-${number}`
	| `leds-in-robotics-${number}`

	type ContentBlockID =
	| LEDReadingBlockID
}

export {}
