"use client"

import { observer } from "mobx-react"
import { useEffect, useRef, useState } from "react"
import sensorDataClass from "../../../classes/sensor-data-class"

// eslint-disable-next-line max-lines-per-function
function IntroductionS6P4MzViz(): React.ReactNode {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const animationRef = useRef<number>()
	const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number; value: number } | null>(null)

	// Canvas configuration
	const canvasSize = 450
	const gridSize = 8
	const cellSize = canvasSize / gridSize
	const padding = 0

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
	// eslint-disable-next-line complexity
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
	const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>): void => {
		const cell = getCellFromMouse(event.clientX, event.clientY)
		if (cell) {
			const rowData = sensorDataClass.distanceGrid[cell.row]

			if (rowData && rowData.length === 8) {
				const value = rowData[cell.col] || 0
				setHoveredCell({ ...cell, value })
			}
		} else {
			setHoveredCell(null)
		}
	}

	// Handle mouse leave
	const handleMouseLeave = (): void => {
		setHoveredCell(null)
	}

	useEffect((): () => void => {
		const canvas = canvasRef.current
		if (!canvas) return (): void => {}

		const ctx = canvas.getContext("2d")
		if (!ctx) return (): void => {}

		// eslint-disable-next-line complexity
		const animate = (): void => {
			// Clear canvas
			ctx.clearRect(0, 0, canvasSize, canvasSize)

			// Check if we have valid grid data
			const hasValidData = sensorDataClass.distanceGrid.length === 8 &&
				sensorDataClass.distanceGrid.every((row): boolean => row.length === 8)

			if (hasValidData) {
				// Draw grid cells
				for (let row = 0; row < gridSize; row++) {
					for (let col = 0; col < gridSize; col++) {
						const distance = sensorDataClass.distanceGrid[row][col] || 0
						const isInvalid = distance === -1

						// Calculate cell position
						const x = padding + col * cellSize
						const y = padding + row * cellSize

						// Draw cell
						ctx.fillStyle = isInvalid ? "#000000" : getColorForDistance(distance)
						ctx.fillRect(x, y, cellSize, cellSize)

						// Draw cell border
						ctx.strokeStyle = "#374151"
						ctx.lineWidth = 1
						ctx.strokeRect(x, y, cellSize, cellSize)

						// Highlight hovered cell
						// eslint-disable-next-line max-depth
						if (hoveredCell && hoveredCell.row === row && hoveredCell.col === col) {
							ctx.strokeStyle = "#FFFFFF"
							ctx.lineWidth = 3
							ctx.strokeRect(x + 1, y + 1, cellSize - 2, cellSize - 2)
						}

						// Draw distance value (small text) - skip for invalid readings
						// eslint-disable-next-line max-depth
						if (!isInvalid) {
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

		return (): void => {
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
						className="border-2 border-swan rounded-lg bg-polar cursor-crosshair"
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
							Cell ({hoveredCell.row + 1}, {hoveredCell.col + 1}): {hoveredCell.value}mm
						</div>
					)}
				</div>
			</div>

			{/* Legend */}
			<div className="flex justify-center">
				<div className="flex items-center space-x-4">
					<div className="flex items-center space-x-2">
						<div className="w-4 h-4 bg-cardinal rounded"/>
						<span className="text-sm">Close ({minDistance}mm)</span>
					</div>
					<div className="flex items-center space-x-2">
						<div className="w-4 h-4 bg-macaw rounded"/>
						<span className="text-sm">Far ({maxDistance}mm)</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default observer(IntroductionS6P4MzViz)
