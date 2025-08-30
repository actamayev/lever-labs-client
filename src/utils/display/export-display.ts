import { DISPLAY_HEIGHT, DISPLAY_WIDTH, FONT_DATA } from "../constants/display-constants"
import createDisplayMessage from "../garage/create-display-message"

export default async function exportDisplay(pixelBuffer: PixelBuffer): Promise<void> {
	// SSD1306 uses 1 bit per pixel, organized in pages of 8 vertical pixels
	// Buffer size: 128 columns × 8 pages = 1024 bytes
	const buffer = new Uint8Array(128 * 8)

	for (let page = 0; page < 8; page++) {
		for (let col = 0; col < 128; col++) {
			let byte = 0
			for (let bit = 0; bit < 8; bit++) {
				const y = page * 8 + bit
				// eslint-disable-next-line max-depth
				if (y < DISPLAY_HEIGHT && pixelBuffer[y] && pixelBuffer[y][col]) {
					byte |= (1 << bit)
				}
			}
			buffer[page * 128 + col] = byte
		}
	}

	// Send to ESP32 instead of just logging
	// You'll need to import MessageBuilder and your connection manager
	try {
		await createDisplayMessage(buffer)
	} catch (error) {
		console.error("Failed to send display buffer:", error)
	}
}

export function applyTextToBuffer(text: string, setPixelInBuffer: (x: number, y: number, state: boolean) => void): void {
	let x = 8 // Starting X position
	const y = 28 // Starting Y position
	for (const char of text.toUpperCase()) {
		const fontData = FONT_DATA[char]
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!fontData) continue
		for (let col = 0; col < 5; col++) {
			for (let row = 0; row < 8; row++) {
				// eslint-disable-next-line max-depth
				if (fontData[col] & (1 << row)) {
					setPixelInBuffer(x + col, y + row, true)
				}
			}
		}
		x += 6 // 5 pixels + 1 space
		if (x >= DISPLAY_WIDTH - 5) break
	}
}
