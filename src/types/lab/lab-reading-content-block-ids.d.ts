declare global {
	type LEDReadingBlockID =
	| `what-is-light-${number}`
	| `evolution-of-light-${number}`
	| `led-advantages-${number}`
	| `inside-led-${number}`
	| `heart-of-led-semiconductors-${number}`
	| `led-colors-${number}`
	| `understanding-led-efficiency-${number}`
	| `led-robotics-${number}`

	type ContentBlockID =
	| LEDReadingBlockID
}

export {}
