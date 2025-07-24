/* eslint-disable @typescript-eslint/naming-convention */
import { useRef, useEffect, useCallback } from "react"
import { Button } from "../../shadcn/ui/button"
import { DISPLAY_WIDTH, DISPLAY_HEIGHT, PIXEL_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT } from "../../../utils/constants/display-constants"

export default function DisplayColumn({ pixelBuffer }: { pixelBuffer: PixelBuffer }) {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	// Get canvas context
	const getContext = useCallback((): CanvasRenderingContext2D | null => {
		const canvas = canvasRef.current
		return canvas ? canvas.getContext("2d") : null
	}, [])

	// Render the canvas based on pixel buffer
	const renderCanvas = useCallback(() => {
		const ctx = getContext()
		if (!ctx) return

		// Clear canvas
		ctx.fillStyle = "#000000"
		ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

		// Draw all pixels
		for (let y = 0; y < DISPLAY_HEIGHT; y++) {
			for (let x = 0; x < DISPLAY_WIDTH; x++) {
				if (pixelBuffer[y] && pixelBuffer[y][x]) {
					ctx.fillStyle = "#ffffff"
					ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)
				}
			}
		}

		// Draw grid (very subtle)
		ctx.strokeStyle = "#1a1a1a"
		ctx.lineWidth = 1
		for (let x = 0; x <= DISPLAY_WIDTH; x++) {
			ctx.beginPath()
			ctx.moveTo(x * PIXEL_SIZE, 0)
			ctx.lineTo(x * PIXEL_SIZE, CANVAS_HEIGHT)
			ctx.stroke()
		}
		for (let y = 0; y <= DISPLAY_HEIGHT; y++) {
			ctx.beginPath()
			ctx.moveTo(0, y * PIXEL_SIZE)
			ctx.lineTo(CANVAS_WIDTH, y * PIXEL_SIZE)
			ctx.stroke()
		}
	}, [getContext, pixelBuffer])

	// Convert pixel buffer to SSD1306 format and export
	const exportBuffer = useCallback(() => {
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

		// Log buffer info
		console.log("SSD1306 Buffer Export:")
		console.log("Buffer size:", buffer.length, "bytes")
		console.log("Buffer data:", Array.from(buffer).map(b => "0x" + b.toString(16).padStart(2, "0")).join(", "))
		console.log("Base64:", btoa(String.fromCharCode(...buffer)))

		return buffer
	}, [pixelBuffer])

	// Update canvas when pixel buffer changes
	useEffect(() => {
		renderCanvas()
	}, [renderCanvas])

	return (
		<div className="flex flex-col items-center space-y-4">
			{/* Display Canvas */}
			<div className="border-2 border-swan rounded-lg overflow-hidden bg-standardBackground">
				<canvas
					ref={canvasRef}
					width={CANVAS_WIDTH}
					height={CANVAS_HEIGHT}
					className="block"
				/>
			</div>

			{/* Conditional Draw Button */}
			{pixelBuffer.some(row => row.some(pixel => pixel)) && (
				<Button
					onClick={exportBuffer}
					className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2"
				>
					Draw
				</Button>
			)}
		</div>
	)
}
