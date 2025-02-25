declare global {
	type LEDReadingBlockID =
	| `intro-to-leds-${number}`
	| `voltage-${number}`
	| `rgb-leds-${number}`

	type ContentBlockID =
	| LEDReadingBlockID
}

export {}
