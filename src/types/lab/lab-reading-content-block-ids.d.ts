declare global {
	type LEDReadingBlockID =
	| `intro-to-leds-${number}`
	| `voltage-${number}`
	| `rgb-leds-${number}`
	| `intro-to-code-${number}`
	| `leds-and-loops-${number}`

	type ContentBlockID =
	| LEDReadingBlockID
}

export {}
