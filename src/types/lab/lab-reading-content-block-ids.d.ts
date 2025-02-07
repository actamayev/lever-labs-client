declare global {
	type LEDReadingBlockID =
	| `what-is-light-${number}`
	| `evolution-of-light-${number}`
	| `led-advantages-${number}`
	| `led-science-${number}`
	| `heart-of-led-semiconductors-${number}`
	| `led-colors-${number}`
	| `led-efficiency-${number}`
	| `led-robotics-${number}`

	type ContentBlockID =
	| LEDReadingBlockID
}

export {}
