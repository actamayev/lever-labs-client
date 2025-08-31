"use client"

import { observer } from "mobx-react"
import { useEffect, useRef, useState } from "react"
import sensorDataClass from "../../../classes/sensor-data-class"

// eslint-disable-next-line max-lines-per-function
function IntroductionS6P4MzViz() {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const animationRef = useRef<number>()
	const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number; value: number } | null>(null)

	// Canvas configuration
	const canvasSize = 400
	const gridSize = 8
	const cellSize = canvasSize / gridSize
	const padding = 20

	// Color configuration
	const minDistance = 0 // mm
	const maxDistance = 1000 // mm
	const closeColor = { r: 255, g: 0, b: 0 } // Red for close objects
	const farColor = { r: 0, g: 0, b: 255 } // Blue for far objects

	// Get color for distance value
	const getColorForDistance = (distance: number): string => {
		// Clamp distance to valid range
		const clampedDistance = Math.max(minDistance, Math.min(maxDistance, distance))
		const normalizedDistance = (clampedDistance - minDistance) / (maxDistance - minDistance)

		// Interpolate between close and far colors
		const r = Math.round(closeColor.r + (farColor.r - closeColor.r) * normalizedDistance)
		const g = Math.round(closeColor.g + (farColor.g - closeColor.g) * normalizedDistance)
		const b = Math.round(closeColor.b + (farColor.b - closeColor.b) * normalizedDistance)

		return `rgb(${r}, ${g}, ${b})`
	}

	// Get cell from mouse position
	const getCellFromMouse = (mouseX: number, mouseY: number): { row: number; col: number } | null => {
		const rect = canvasRef.current?.getBoundingClientRect()
		if (!rect) return null

		const x = mouseX - rect.left
		const y = mouseY - rect.top

		if (x < padding || x > canvasSize - padding || y < padding || y > canvasSize - padding) {
			return null
		}

		const col = Math.floor((x - padding) / cellSize)
		const row = Math.floor((y - padding) / cellSize)

		if (col >= 0 && col < gridSize && row >= 0 && row < gridSize) {
			return { row, col }
		}

		return null
	}

	// Handle mouse move for tooltips
	const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
		const cell = getCellFromMouse(event.clientX, event.clientY)
		if (cell) {
			const latestData = sensorDataClass.distanceGrid[sensorDataClass.distanceGrid.length - 1]
			if (latestData && latestData.length === 64) {
				const index = cell.row * gridSize + cell.col
				const value = latestData[index] || 0
				setHoveredCell({ ...cell, value })
			}
		} else {
			setHoveredCell(null)
		}
	}

	// Handle mouse leave
	const handleMouseLeave = () => {
		setHoveredCell(null)
	}

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext("2d")
		if (!ctx) return

		const animate = () => {
			// Clear canvas
			ctx.clearRect(0, 0, canvasSize, canvasSize)

			// Get latest distance grid data
			const latestData = sensorDataClass.distanceGrid[sensorDataClass.distanceGrid.length - 1]

			if (latestData && latestData.length === 64) {
				// Draw grid cells
				for (let row = 0; row < gridSize; row++) {
					for (let col = 0; col < gridSize; col++) {
						const index = row * gridSize + col
						const distance = latestData[index] || 0
						const color = getColorForDistance(distance)

						// Calculate cell position
						const x = padding + col * cellSize
						const y = padding + row * cellSize

						// Draw cell
						ctx.fillStyle = color
						ctx.fillRect(x, y, cellSize, cellSize)

						// Draw cell border
						ctx.strokeStyle = "#374151"
						ctx.lineWidth = 1
						ctx.strokeRect(x, y, cellSize, cellSize)

						// Highlight hovered cell
						if (hoveredCell && hoveredCell.row === row && hoveredCell.col === col) {
							ctx.strokeStyle = "#FFFFFF"
							ctx.lineWidth = 3
							ctx.strokeRect(x + 1, y + 1, cellSize - 2, cellSize - 2)
						}

						// Draw distance value (small text)
						ctx.fillStyle = distance < maxDistance / 2 ? "#FFFFFF" : "#000000"
						ctx.font = "10px Arial"
						ctx.textAlign = "center"
						ctx.textBaseline = "middle"
						ctx.fillText(
							`${distance}`,
							x + cellSize / 2,
							y + cellSize / 2
						)
					}
				}
			} else {
				// Draw placeholder when no data
				ctx.fillStyle = "#6B7280"
				ctx.font = "16px Arial"
				ctx.textAlign = "center"
				ctx.textBaseline = "middle"
				ctx.fillText("No sensor data available", canvasSize / 2, canvasSize / 2)
			}

			animationRef.current = requestAnimationFrame(animate)
		}

		animate()

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current)
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hoveredCell])

	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold text-center mb-6">Multizone Sensor Heat Map</h2>

			<div className="flex justify-center">
				<div className="relative">
					<canvas
						ref={canvasRef}
						width={canvasSize}
						height={canvasSize}
						className="border-2 border-gray-300 rounded-lg bg-gray-50 cursor-crosshair"
						onMouseMove={handleMouseMove}
						onMouseLeave={handleMouseLeave}
					/>

					{/* Tooltip */}
					{hoveredCell && (
						<div className="absolute bg-black bg-opacity-75 text-white px-3 py-2 rounded text-sm pointer-events-none z-10"
							style={{
								left: `${hoveredCell.col * cellSize + padding + cellSize / 2}px`,
								top: `${hoveredCell.row * cellSize + padding - 30}px`,
								transform: "translateX(-50%)"
							}}
						>
							Cell ({hoveredCell.row}, {hoveredCell.col}): {hoveredCell.value}mm
						</div>
					)}
				</div>
			</div>

			{/* Legend */}
			<div className="flex justify-center">
				<div className="flex items-center space-x-4">
					<div className="flex items-center space-x-2">
						<div className="w-4 h-4 bg-red-500 rounded"></div>
						<span className="text-sm">Close ({minDistance}mm)</span>
					</div>
					<div className="flex items-center space-x-2">
						<div className="w-4 h-4 bg-blue-500 rounded"></div>
						<span className="text-sm">Far ({maxDistance}mm)</span>
					</div>
				</div>
			</div>

			{/* Data Summary */}
			<div className="text-center text-sm text-gray-600">
				<div>Latest Data Points: {sensorDataClass.distanceGrid.length > 0 ? sensorDataClass.distanceGrid[sensorDataClass.distanceGrid.length - 1]?.length || 0 : 0}/64</div>
				<div>Data History: {sensorDataClass.distanceGrid.length} samples</div>
			</div>
		</div>
	)
}

export default observer(IntroductionS6P4MzViz)
