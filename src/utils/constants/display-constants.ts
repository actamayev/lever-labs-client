/* eslint-disable @typescript-eslint/naming-convention */
export const DISPLAY_WIDTH = 128
export const DISPLAY_HEIGHT = 64
export const PIXEL_SIZE = 4
export const CANVAS_WIDTH = DISPLAY_WIDTH * PIXEL_SIZE
export const CANVAS_HEIGHT = DISPLAY_HEIGHT * PIXEL_SIZE

export interface Point {
	x: number
	y: number
}

export interface PreDefinedDesign {
	name: string
	pixels: Point[]
}

export const PRE_DEFINED_DESIGNS: PreDefinedDesign[] = [
	{
		name: "Happy Eyes",
		pixels: [
			// Left eye
			{ x: 30, y: 20 }, { x: 31, y: 19 }, { x: 32, y: 18 }, { x: 33, y: 18 }, { x: 34, y: 19 }, { x: 35, y: 20 },
			{ x: 29, y: 21 }, { x: 36, y: 21 }, { x: 29, y: 22 }, { x: 36, y: 22 }, { x: 30, y: 23 }, { x: 35, y: 23 },
			{ x: 31, y: 24 }, { x: 32, y: 24 }, { x: 33, y: 24 }, { x: 34, y: 24 },
			// Left pupil
			{ x: 32, y: 21 }, { x: 33, y: 21 },

			// Right eye
			{ x: 85, y: 20 }, { x: 86, y: 19 }, { x: 87, y: 18 }, { x: 88, y: 18 }, { x: 89, y: 19 }, { x: 90, y: 20 },
			{ x: 84, y: 21 }, { x: 91, y: 21 }, { x: 84, y: 22 }, { x: 91, y: 22 }, { x: 85, y: 23 }, { x: 90, y: 23 },
			{ x: 86, y: 24 }, { x: 87, y: 24 }, { x: 88, y: 24 }, { x: 89, y: 24 },
			// Right pupil
			{ x: 87, y: 21 }, { x: 88, y: 21 },
		]
	},
	{
		name: "Sad Eyes",
		pixels: [
			// Left eye (droopy)
			{ x: 28, y: 18 }, { x: 29, y: 19 }, { x: 30, y: 20 }, { x: 31, y: 20 }, { x: 32, y: 19 }, { x: 33, y: 18 },
			{ x: 27, y: 21 }, { x: 34, y: 21 }, { x: 28, y: 22 }, { x: 33, y: 22 }, { x: 29, y: 23 }, { x: 32, y: 23 },
			{ x: 30, y: 24 }, { x: 31, y: 24 },
			// Left pupil
			{ x: 30, y: 21 }, { x: 31, y: 21 },

			// Right eye (droopy)
			{ x: 87, y: 18 }, { x: 88, y: 19 }, { x: 89, y: 20 }, { x: 90, y: 20 }, { x: 91, y: 19 }, { x: 92, y: 18 },
			{ x: 86, y: 21 }, { x: 93, y: 21 }, { x: 87, y: 22 }, { x: 92, y: 22 }, { x: 88, y: 23 }, { x: 91, y: 23 },
			{ x: 89, y: 24 }, { x: 90, y: 24 },
			// Right pupil
			{ x: 89, y: 21 }, { x: 90, y: 21 },
		]
	},
	{
		name: "Heart",
		pixels: [
			// Heart shape
			{ x: 58, y: 25 }, { x: 59, y: 24 }, { x: 60, y: 23 }, { x: 61, y: 23 }, { x: 62, y: 24 }, { x: 63, y: 25 },
			{ x: 64, y: 26 }, { x: 65, y: 25 }, { x: 66, y: 24 }, { x: 67, y: 23 }, { x: 68, y: 23 }, { x: 69, y: 24 }, { x: 70, y: 25 },
			{ x: 57, y: 26 }, { x: 71, y: 26 }, { x: 57, y: 27 }, { x: 71, y: 27 }, { x: 58, y: 28 }, { x: 70, y: 28 },
			{ x: 59, y: 29 }, { x: 69, y: 29 }, { x: 60, y: 30 }, { x: 68, y: 30 }, { x: 61, y: 31 }, { x: 67, y: 31 },
			{ x: 62, y: 32 }, { x: 66, y: 32 }, { x: 63, y: 33 }, { x: 65, y: 33 }, { x: 64, y: 34 }
		]
	},
	{
		name: "Smiley Face",
		pixels: [
			// Eyes
			{ x: 45, y: 22 }, { x: 46, y: 22 }, { x: 45, y: 23 }, { x: 46, y: 23 },
			{ x: 81, y: 22 }, { x: 82, y: 22 }, { x: 81, y: 23 }, { x: 82, y: 23 },
			// Smile
			{ x: 50, y: 35 }, { x: 51, y: 36 }, { x: 52, y: 37 }, { x: 53, y: 38 }, { x: 54, y: 38 }, { x: 55, y: 38 },
			{ x: 72, y: 38 }, { x: 73, y: 38 }, { x: 74, y: 38 }, { x: 75, y: 37 }, { x: 76, y: 36 }, { x: 77, y: 35 }
		]
	}
]

// Simple 5x7 font bitmap
export const FONT_DATA: { [key: string]: number[] } = {
	"A": [0x7E, 0x11, 0x11, 0x11, 0x7E],
	"B": [0x7F, 0x49, 0x49, 0x49, 0x36],
	"C": [0x3E, 0x41, 0x41, 0x41, 0x22],
	"D": [0x7F, 0x41, 0x41, 0x22, 0x1C],
	"E": [0x7F, 0x49, 0x49, 0x49, 0x41],
	"F": [0x7F, 0x09, 0x09, 0x09, 0x01],
	"G": [0x3E, 0x41, 0x49, 0x49, 0x7A],
	"H": [0x7F, 0x08, 0x08, 0x08, 0x7F],
	"I": [0x00, 0x41, 0x7F, 0x41, 0x00],
	"J": [0x20, 0x40, 0x41, 0x3F, 0x01],
	"K": [0x7F, 0x08, 0x14, 0x22, 0x41],
	"L": [0x7F, 0x40, 0x40, 0x40, 0x40],
	"M": [0x7F, 0x02, 0x0C, 0x02, 0x7F],
	"N": [0x7F, 0x04, 0x08, 0x10, 0x7F],
	"O": [0x3E, 0x41, 0x41, 0x41, 0x3E],
	"P": [0x7F, 0x09, 0x09, 0x09, 0x06],
	"Q": [0x3E, 0x41, 0x51, 0x21, 0x5E],
	"R": [0x7F, 0x09, 0x19, 0x29, 0x46],
	"S": [0x46, 0x49, 0x49, 0x49, 0x31],
	"T": [0x01, 0x01, 0x7F, 0x01, 0x01],
	"U": [0x3F, 0x40, 0x40, 0x40, 0x3F],
	"V": [0x1F, 0x20, 0x40, 0x20, 0x1F],
	"W": [0x3F, 0x40, 0x38, 0x40, 0x3F],
	"X": [0x63, 0x14, 0x08, 0x14, 0x63],
	"Y": [0x07, 0x08, 0x70, 0x08, 0x07],
	"Z": [0x61, 0x51, 0x49, 0x45, 0x43],
	" ": [0x00, 0x00, 0x00, 0x00, 0x00],
	"!": [0x00, 0x00, 0x5F, 0x00, 0x00],
	"?": [0x02, 0x01, 0x51, 0x09, 0x06],
	".": [0x00, 0x60, 0x60, 0x00, 0x00],
	",": [0x00, 0x80, 0x60, 0x00, 0x00],
	":": [0x00, 0x36, 0x36, 0x00, 0x00],
	"0": [0x3E, 0x51, 0x49, 0x45, 0x3E],
	"1": [0x00, 0x42, 0x7F, 0x40, 0x00],
	"2": [0x42, 0x61, 0x51, 0x49, 0x46],
	"3": [0x21, 0x41, 0x45, 0x4B, 0x31],
	"4": [0x18, 0x14, 0x12, 0x7F, 0x10],
	"5": [0x27, 0x45, 0x45, 0x45, 0x39],
	"6": [0x3C, 0x4A, 0x49, 0x49, 0x30],
	"7": [0x01, 0x71, 0x09, 0x05, 0x03],
	"8": [0x36, 0x49, 0x49, 0x49, 0x36],
	"9": [0x06, 0x49, 0x49, 0x29, 0x1E],
}
