import { observer } from "mobx-react"
import { useRef, useEffect, useCallback } from "react"
import { DISPLAY_WIDTH, DISPLAY_HEIGHT, PIXEL_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT } from "../../../utils/constants/display-constants"
import garageClass from "../../../classes/garage-class"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import getDuolingoColors from "../../../utils/get-duolingo-colors"
import { cn } from "../../../lib/shadcn/utils"
import createDisplayMessage from "../../../utils/garage/create-display-message"

function RenderDisplay () {
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
				if (garageClass.pixelBuffer[y] && garageClass.pixelBuffer[y][x]) {
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getContext, garageClass.pixelBuffer])

	// Convert pixel buffer to SSD1306 format and export
	// Replace the existing exportBuffer function with this:
	const exportBuffer = useCallback(async () => {
		// SSD1306 uses 1 bit per pixel, organized in pages of 8 vertical pixels
		// Buffer size: 128 columns × 8 pages = 1024 bytes
		const buffer = new Uint8Array(128 * 8)

		for (let page = 0; page < 8; page++) {
			for (let col = 0; col < 128; col++) {
				let byte = 0
				for (let bit = 0; bit < 8; bit++) {
					const y = page * 8 + bit
					// eslint-disable-next-line max-depth
					if (y < DISPLAY_HEIGHT && garageClass.pixelBuffer[y] && garageClass.pixelBuffer[y][col]) {
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
			console.log("Display buffer sent to ESP32!")
		} catch (error) {
			console.error("Failed to send display buffer:", error)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [garageClass.pixelBuffer])

	// Update canvas when pixel buffer changes
	useEffect(() => {
		renderCanvas()
	}, [renderCanvas])

	const colors = getDuolingoColors("humpback")

	return (
		<div className="flex flex-col items-center space-y-4">
			{/* Display Canvas */}
			<div className="border-2 border-swan rounded-2xl overflow-hidden bg-standardBackground">
				<canvas
					ref={canvasRef}
					width={CANVAS_WIDTH}
					height={CANVAS_HEIGHT}
					className="block"
				/>
			</div>

			{/* Conditional Draw Button */}
			{garageClass.pixelBuffer.some(row => row.some(pixel => pixel)) && (
				<TactileButton
					onClick={exportBuffer}
					className={cn("text-white font-medium px-6 py-2 h-8 rounded-xl", colors.bg)}
					shadowClass={colors.shadow2}
					shadowHeight={4}
				>
					DRAW
				</TactileButton>
			)}
		</div>
	)
}

export default observer(RenderDisplay)
