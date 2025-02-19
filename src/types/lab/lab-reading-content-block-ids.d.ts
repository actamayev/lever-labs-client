declare global {
	type LEDReadingBlockID =
	| `intro-to-leds-${number}`

	type ContentBlockID =
	| LEDReadingBlockID
}

export {}
