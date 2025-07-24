import { useState, useCallback } from "react"
import DisplayColumn from "./display-column"
import ControlsColumn from "./controls-column"
import TrianglesColumn from "./triangles-column"
import { PRE_DEFINED_DESIGNS, Point, FONT_DATA, DISPLAY_WIDTH, DISPLAY_HEIGHT } from "../../../utils/constants/display-constants"

export default function ParentDisplay() {
	// Main pixel buffer state
	const [pixelBuffer, setPixelBuffer] = useState<boolean[][]>(() =>
		Array(DISPLAY_HEIGHT).fill(null).map(() => Array(DISPLAY_WIDTH).fill(false))
	)

	// Input states
	const [selectedDesign, setSelectedDesign] = useState<string>("")
	const [textInput, setTextInput] = useState<string>("")

	// Set pixel in buffer
	const setPixelInBuffer = useCallback((x: number, y: number, state: boolean) => {
		if (x >= 0 && x < DISPLAY_WIDTH && y >= 0 && y < DISPLAY_HEIGHT) {
			setPixelBuffer(prev => {
				const newBuffer = prev.map(row => [...row])
				newBuffer[y][x] = state
				return newBuffer
			})
		}
	}, [])

	// Clear buffer
	const clearBuffer = useCallback(() => {
		setPixelBuffer(Array(DISPLAY_HEIGHT).fill(null).map(() => Array(DISPLAY_WIDTH).fill(false)))
	}, [])

	// Apply design to buffer
	const applyDesignToBuffer = useCallback((designName: string) => {
		const design = PRE_DEFINED_DESIGNS.find(d => d.name === designName)
		if (!design) return

		clearBuffer()
		design.pixels.forEach((pixel: Point) => {
			setPixelInBuffer(pixel.x, pixel.y, true)
		})
	}, [clearBuffer, setPixelInBuffer])

	// Apply text to buffer
	const applyTextToBuffer = useCallback((text: string) => {
		if (!text.trim()) return

		clearBuffer()
		let x = 8 // Starting X position
		const y = 28 // Starting Y position

		for (const char of text.toUpperCase()) {
			const fontData = FONT_DATA[char] || FONT_DATA[" "]

			for (let col = 0; col < 5; col++) {
				for (let row = 0; row < 8; row++) {
					if (fontData[col] & (1 << row)) {
						setPixelInBuffer(x + col, y + row, true)
					}
				}
			}
			x += 6 // 5 pixels + 1 space
			if (x >= DISPLAY_WIDTH - 5) break // Don't overflow
		}
	}, [clearBuffer, setPixelInBuffer])

	// Check if buffer has content
	const hasContent = pixelBuffer.some(row => row.some(pixel => pixel))

	return (
		<div className="flex items-center justify-center bg-standardBackground text-white">
			<div className="flex items-center">
				<div className="grid grid-cols-3 items-center">

					{/* Column 1 - Controls */}
					<ControlsColumn
						designs={PRE_DEFINED_DESIGNS}
						selectedDesign={selectedDesign}
						textInput={textInput}
						onDesignChange={setSelectedDesign}
						onTextChange={setTextInput}
					/>

					{/* Column 2 - Action Triangles */}
					<TrianglesColumn
						onApplyDesign={() => applyDesignToBuffer(selectedDesign)}
						onApplyText={() => applyTextToBuffer(textInput)}
						canApplyDesign={!!selectedDesign}
						canApplyText={!!textInput.trim()}
					/>

					{/* Column 3 - Display Preview */}
					<DisplayColumn
						pixelBuffer={pixelBuffer}
						hasContent={hasContent}
					/>

				</div>
			</div>
		</div>
	)
}
