"use client"

import { useRef, useEffect, useCallback } from "react"
import { DISPLAY_WIDTH, DISPLAY_HEIGHT, PIXEL_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT } from "../../../utils/constants/display-constants"

interface Props {
	pixelBuffer: PixelBuffer
}

export default function RenderDisplay (props: Props): React.ReactNode {
	const { pixelBuffer } = props
	const canvasRef = useRef<HTMLCanvasElement>(null)

	// Get canvas context
	const getContext = useCallback((): CanvasRenderingContext2D | null => {
		const canvas = canvasRef.current
		return canvas ? canvas.getContext("2d") : null
	}, [])

	// Render the canvas based on pixel buffer
	const renderCanvas = useCallback((): void => {
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

	// Update canvas when pixel buffer changes
	useEffect((): void => {
		renderCanvas()
	}, [renderCanvas])

	return (
		<div className="flex flex-col items-center space-y-4">
			{/* Display Canvas */}
			<div className="border-2 border-swan rounded-2xl overflow-hidden bg-standard-background">
				<canvas
					ref={canvasRef}
					width={CANVAS_WIDTH}
					height={CANVAS_HEIGHT}
					className="block"
				/>
			</div>
		</div>
	)
}
