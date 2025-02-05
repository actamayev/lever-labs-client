declare global {
	type LEDReadingBlockID =
	| "led-intro"
	| "led-process-overview"
	| "led-light-reaction"
	| "led-dark-reaction"
	| "led-conclusion"

	type ContentBlockID =
	| LEDReadingBlockID
}

export {}
