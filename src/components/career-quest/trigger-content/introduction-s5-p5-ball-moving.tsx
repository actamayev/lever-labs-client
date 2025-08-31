"use client"

import { observer } from "mobx-react"
import { useEffect, useRef, useState } from "react"
import sensorDataClass from "../../../classes/sensor-data-class"

// eslint-disable-next-line max-lines-per-function
function IntroductionS5P5BallMoving() {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const animationRef = useRef<number>()
	const [ballPosition, setBallPosition] = useState({ x: 200, y: 150 })
	const [ballVelocity, setBallVelocity] = useState({ x: 0, y: 0 })

	// Physics constants
	const ballRadius = 15
	const friction = 0.98
	const sensitivity = 0.5
	const boundaryPadding = 20
	const canvasWidth = 400
	const canvasHeight = 300

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext("2d")
		if (!ctx) return

		const animate = () => {
			// Get latest IMU data
			const latestRoll = sensorDataClass.roll[sensorDataClass.roll.length - 1] || 0
			const latestPitch = sensorDataClass.pitch[sensorDataClass.pitch.length - 1] || 0

			// Convert roll and pitch to velocity changes
			// Roll affects x velocity (left/right tilt)
			// Pitch affects y velocity (forward/backward tilt)
			const rollVelocity = (latestRoll / 90) * sensitivity // Normalize to -1 to 1 range
			const pitchVelocity = (latestPitch / 90) * sensitivity

			// Update velocity based on IMU data
			setBallVelocity(prev => ({
				x: prev.x * friction + rollVelocity,
				y: prev.y * friction + pitchVelocity
			}))

			// Update position
			setBallPosition(prev => {
				let newX = prev.x + ballVelocity.x
				let newY = prev.y + ballVelocity.y

				// Boundary collision detection
				const minX = boundaryPadding + ballRadius
				const maxX = canvasWidth - boundaryPadding - ballRadius
				const minY = boundaryPadding + ballRadius
				const maxY = canvasHeight - boundaryPadding - ballRadius

				// Bounce off walls
				if (newX < minX) {
					newX = minX
					setBallVelocity(current => ({ ...current, x: -current.x * 0.8 }))
				} else if (newX > maxX) {
					newX = maxX
					setBallVelocity(current => ({ ...current, x: -current.x * 0.8 }))
				}

				if (newY < minY) {
					newY = minY
					setBallVelocity(current => ({ ...current, y: -current.y * 0.8 }))
				} else if (newY > maxY) {
					newY = maxY
					setBallVelocity(current => ({ ...current, y: -current.y * 0.8 }))
				}

				return { x: newX, y: newY }
			})

			// Clear canvas
			ctx.clearRect(0, 0, canvasWidth, canvasHeight)

			// Draw border
			ctx.strokeStyle = "#374151"
			ctx.lineWidth = 3
			ctx.strokeRect(
				boundaryPadding,
				boundaryPadding,
				canvasWidth - 2 * boundaryPadding,
				canvasHeight - 2 * boundaryPadding
			)

			// Draw ball with gradient
			const gradient = ctx.createRadialGradient(
				ballPosition.x - 5,
				ballPosition.y - 5,
				0,
				ballPosition.x,
				ballPosition.y,
				ballRadius
			)
			gradient.addColorStop(0, "#60A5FA") // Light blue
			gradient.addColorStop(1, "#2563EB") // Dark blue

			ctx.fillStyle = gradient
			ctx.beginPath()
			ctx.arc(ballPosition.x, ballPosition.y, ballRadius, 0, 2 * Math.PI)
			ctx.fill()

			// Add highlight to ball
			ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
			ctx.beginPath()
			ctx.arc(ballPosition.x - 3, ballPosition.y - 3, ballRadius / 3, 0, 2 * Math.PI)
			ctx.fill()

			// Draw velocity indicator
			const velocityMagnitude = Math.sqrt(ballVelocity.x * ballVelocity.x + ballVelocity.y * ballVelocity.y)
			if (velocityMagnitude > 0.1) {
				ctx.strokeStyle = "#EF4444"
				ctx.lineWidth = 2
				ctx.beginPath()
				ctx.moveTo(ballPosition.x, ballPosition.y)
				ctx.lineTo(
					ballPosition.x + ballVelocity.x * 20,
					ballPosition.y + ballVelocity.y * 20
				)
				ctx.stroke()
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
	}, [ballVelocity])

	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold text-center mb-6">Tilt-Controlled Ball</h2>

			<div className="flex justify-center">
				<div className="relative">
					<canvas
						ref={canvasRef}
						width={canvasWidth}
						height={canvasHeight}
						className="border-2 border-gray-300 rounded-lg bg-gray-50"
					/>

					{/* Instructions overlay */}
					<div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white px-3 py-1 rounded text-sm">
						Tilt to move ball
					</div>
				</div>
			</div>

			{/* IMU Data Display */}
			<div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
				<div className="text-center p-3 bg-blue-50 rounded-lg">
					<div className="text-lg font-semibold text-blue-600">
						Roll: {(sensorDataClass.roll[sensorDataClass.roll.length - 1] || 0).toFixed(1)}°
					</div>
					<div className="text-xs text-gray-600">Controls X movement</div>
				</div>
				<div className="text-center p-3 bg-green-50 rounded-lg">
					<div className="text-lg font-semibold text-green-600">
						Pitch: {(sensorDataClass.pitch[sensorDataClass.pitch.length - 1] || 0).toFixed(1)}°
					</div>
					<div className="text-xs text-gray-600">Controls Y movement</div>
				</div>
			</div>

			{/* Ball Physics Info */}
			<div className="text-center text-sm text-gray-600">
				<div>Velocity: {Math.sqrt(ballVelocity.x * ballVelocity.x + ballVelocity.y * ballVelocity.y).toFixed(2)}</div>
				<div>Position: ({ballPosition.x.toFixed(0)}, {ballPosition.y.toFixed(0)})</div>
			</div>
		</div>
	)
}

export default observer(IntroductionS5P5BallMoving)
