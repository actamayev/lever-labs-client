"use client"

import { observer } from "mobx-react"
import { useEffect, useRef, useState } from "react"
import sensorDataClass from "../../../../classes/sensor-data-class"

type Vec2 = { x: number; y: number }

// eslint-disable-next-line max-lines-per-function
function MeetPipS5P5BallMoving(): JSX.Element {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const animationRef = useRef<number | null>(null)

	// Initial positions
	const initialBall: Vec2 = { x: 200, y: 150 }
	const initialVelocity: Vec2 = { x: 0, y: 0 }

	// UI state (used for showing values)
	const [ballPosition, setBallPosition] = useState<Vec2>(initialBall)
	const [ballVelocity, setBallVelocity] = useState<Vec2>(initialVelocity)

	// Hole state (displayed)
	const [holePosition, setHolePosition] = useState<Vec2>({ x: 80, y: 80 })
	const [holeRadius, setHoleRadius] = useState<number>(20)

	// Refs to keep latest values for the animation loop (avoid stale closures)
	const currentPositionRef = useRef<Vec2>(initialBall)
	const currentVelocityRef = useRef<Vec2>(initialVelocity)
	const holePositionRef = useRef<Vec2>(holePosition)
	const holeRadiusRef = useRef<number>(holeRadius)

	// Physics constants (tuned for a snappier feel)
	const ballRadius = 15
	const friction = 0.96         // slightly lower => keeps velocity longer
	const sensitivity = 0.14      // increased sensitivity for faster response
	const boundaryPadding = 20
	const canvasWidth = 450
	const canvasHeight = 300

	// Utility: clamp a value
	const clamp = (v: number, a: number, b: number): number => Math.max(a, Math.min(b, v))

	// Spawn / respawn logic: picks non-overlapping ball + hole positions
	const respawn = (ctx?: CanvasRenderingContext2D | null): void => {
		const minX = boundaryPadding + ballRadius
		const maxX = canvasWidth - boundaryPadding - ballRadius
		const minY = boundaryPadding + ballRadius
		const maxY = canvasHeight - boundaryPadding - ballRadius

		// Pick hole location first (allow hole to be closer to edges)
		const holeR = 18 + Math.floor(Math.random() * 8) // 18..25
		let hx: number, hy: number, bx: number, by: number
		let tries = 0
		do {
			hx = Math.floor(Math.random() * (maxX - minX + 1)) + minX
			hy = Math.floor(Math.random() * (maxY - minY + 1)) + minY

			// Pick ball somewhere reasonably far away from the hole
			const margin = (holeR + ballRadius) + 30
			const bxMin = clamp(minX, minX, maxX)
			const bxMax = clamp(maxX, minX, maxX)
			const byMin = clamp(minY, minY, maxY)
			const byMax = clamp(maxY, minY, maxY)

			bx = Math.floor(Math.random() * (bxMax - bxMin + 1)) + bxMin
			by = Math.floor(Math.random() * (byMax - byMin + 1)) + byMin

			const dx = bx - hx
			const dy = by - hy
			const dist = Math.sqrt(dx * dx + dy * dy)

			tries++
			// repeat until ball is comfortably away from hole (or give up after many tries)
			if (dist > margin || tries > 50) break
		} while (true)

		// Update state + refs
		const newHole: Vec2 = { x: hx, y: hy }
		const newBall: Vec2 = { x: bx, y: by }

		holePositionRef.current = newHole
		setHolePosition(newHole)
		holeRadiusRef.current = holeR
		setHoleRadius(holeR)

		currentPositionRef.current = newBall
		currentVelocityRef.current = { x: 0, y: 0 }

		setBallPosition(newBall)
		setBallVelocity({ x: 0, y: 0 })

		// Optionally clear/redraw immediately
		if (ctx) {
			ctx.clearRect(0, 0, canvasWidth, canvasHeight)
		}
	}

	// Reset only the hole position while keeping the ball where it is
	const resetHolePosition = (ctx?: CanvasRenderingContext2D | null): void => {
		const minX = boundaryPadding + ballRadius
		const maxX = canvasWidth - boundaryPadding - ballRadius
		const minY = boundaryPadding + ballRadius
		const maxY = canvasHeight - boundaryPadding - ballRadius

		// Pick new hole location
		const holeR = 18 + Math.floor(Math.random() * 8) // 18..25
		let hx: number, hy: number
		let tries = 0
		const currentBallPos = currentPositionRef.current

		do {
			hx = Math.floor(Math.random() * (maxX - minX + 1)) + minX
			hy = Math.floor(Math.random() * (maxY - minY + 1)) + minY

			// Ensure hole is far enough from current ball position
			const margin = (holeR + ballRadius) + 30
			const dx = currentBallPos.x - hx
			const dy = currentBallPos.y - hy
			const dist = Math.sqrt(dx * dx + dy * dy)

			tries++
			// repeat until hole is comfortably away from ball (or give up after many tries)
			if (dist > margin || tries > 50) break
		} while (true)

		// Update only hole state + refs
		const newHole: Vec2 = { x: hx, y: hy }
		holePositionRef.current = newHole
		setHolePosition(newHole)
		holeRadiusRef.current = holeR
		setHoleRadius(holeR)

		// Optionally clear/redraw immediately
		if (ctx) {
			ctx.clearRect(0, 0, canvasWidth, canvasHeight)
		}
	}

	// eslint-disable-next-line max-lines-per-function
	useEffect((): (() => void) => {
		const canvas = canvasRef.current
		if (!canvas) return (): void => {}

		const ctx = canvas.getContext("2d")
		if (!ctx) return (): void => {}

		// initialize refs with state values (in case of hot reload)
		currentPositionRef.current = ballPosition
		currentVelocityRef.current = ballVelocity
		holePositionRef.current = holePosition
		holeRadiusRef.current = holeRadius

		// Ensure initial random positions if desired (comment out if you prefer fixed)
		respawn(ctx)

		// eslint-disable-next-line max-lines-per-function
		const animate = (): void => {
			// Get latest IMU data
			const latestRoll = sensorDataClass.roll[sensorDataClass.roll.length - 1] || 0
			const latestPitch = sensorDataClass.pitch[sensorDataClass.pitch.length - 1] || 0

			// Convert roll and pitch to velocity changes
			const rollVelocity = (latestRoll / 90) * sensitivity
			const pitchVelocity = (latestPitch / 90) * sensitivity

			// Update velocity (friction + tilt)
			const newVelocity = {
				x: currentVelocityRef.current.x * friction + rollVelocity,
				y: currentVelocityRef.current.y * friction + pitchVelocity
			}
			currentVelocityRef.current = newVelocity

			// Update position
			let newX = currentPositionRef.current.x + newVelocity.x
			let newY = currentPositionRef.current.y + newVelocity.y

			// Boundaries
			const minX = boundaryPadding + ballRadius
			const maxX = canvasWidth - boundaryPadding - ballRadius
			const minY = boundaryPadding + ballRadius
			const maxY = canvasHeight - boundaryPadding - ballRadius

			// Collision with walls (bounce)
			if (newX < minX) {
				newX = minX
				newVelocity.x = -newVelocity.x * 0.8
			} else if (newX > maxX) {
				newX = maxX
				newVelocity.x = -newVelocity.x * 0.8
			}

			if (newY < minY) {
				newY = minY
				newVelocity.y = -newVelocity.y * 0.8
			} else if (newY > maxY) {
				newY = maxY
				newVelocity.y = -newVelocity.y * 0.8
			}

			currentPositionRef.current = { x: newX, y: newY }

			// Check for hole collision
			const hx = holePositionRef.current.x
			const hy = holePositionRef.current.y
			const hr = holeRadiusRef.current

			const dx = newX - hx
			const dy = newY - hy
			const dist = Math.sqrt(dx * dx + dy * dy)

			// Consider ball "in" hole when center-to-center distance < (hole radius - small margin)
			if (dist <= hr - Math.max(2, ballRadius * 0.4)) {
				// ball fell in hole -> respawn both at new random positions
				respawn(ctx)
			} else {
				// Normal update path: update UI state for display
				setBallPosition({ x: newX, y: newY })
				setBallVelocity(newVelocity)
			}

			// ---- Drawing ----
			ctx.clearRect(0, 0, canvasWidth, canvasHeight)

			// Draw boundary
			ctx.strokeStyle = "#000000"
			ctx.lineWidth = 3
			ctx.strokeRect(
				boundaryPadding,
				boundaryPadding,
				canvasWidth - 2 * boundaryPadding,
				canvasHeight - 2 * boundaryPadding
			)

			// Draw hole (dark circle with inner shadow)
			const holeGrad = ctx.createRadialGradient(hx - hr * 0.25, hy - hr * 0.25, hr * 0.1, hx, hy, hr)
			holeGrad.addColorStop(0, "#111827")
			holeGrad.addColorStop(1, "#000000")
			ctx.fillStyle = holeGrad
			ctx.beginPath()
			ctx.arc(hx, hy, hr, 0, Math.PI * 2)
			ctx.fill()

			// Draw subtle rim
			ctx.strokeStyle = "rgba(255,255,255,0.06)"
			ctx.lineWidth = 1
			ctx.beginPath()
			ctx.arc(hx, hy, hr + 1, 0, Math.PI * 2)
			ctx.stroke()

			// Draw ball with radial gradient
			const gradient = ctx.createRadialGradient(
				newX - 5,
				newY - 5,
				0,
				newX,
				newY,
				ballRadius
			)
			gradient.addColorStop(0, "#60A5FA")
			gradient.addColorStop(1, "#2563EB")

			ctx.fillStyle = gradient
			ctx.beginPath()
			ctx.arc(newX, newY, ballRadius, 0, 2 * Math.PI)
			ctx.fill()

			// Ball highlight
			ctx.fillStyle = "rgba(255,255,255,0.28)"
			ctx.beginPath()
			ctx.arc(newX - 4, newY - 4, ballRadius / 3, 0, 2 * Math.PI)
			ctx.fill()

			// Velocity indicator
			const velocityMagnitude = Math.sqrt(newVelocity.x * newVelocity.x + newVelocity.y * newVelocity.y)
			if (velocityMagnitude > 0.08) {
				ctx.strokeStyle = "#EF4444"
				ctx.lineWidth = 2
				ctx.beginPath()
				ctx.moveTo(newX, newY)
				ctx.lineTo(newX + newVelocity.x * 20, newY + newVelocity.y * 20)
				ctx.stroke()
			}

			animationRef.current = requestAnimationFrame(animate)
		}

		animationRef.current = requestAnimationFrame(animate)

		return (): void => {
			if (animationRef.current !== null) {
				cancelAnimationFrame(animationRef.current)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []) // intentionally empty; refs are used for animation loop

	return (
		<div className="space-y-6">
			<div className="flex justify-center">
				<div className="relative">
					<canvas
						ref={canvasRef}
						width={canvasWidth}
						height={canvasHeight}
						className="w-full h-full"
					/>
				</div>
			</div>

			{/* Reset Hole Button */}
			<div className="flex justify-center">
				<button
					onClick={(): void => {
						const canvas = canvasRef.current
						if (canvas) {
							const ctx = canvas.getContext("2d")
							resetHolePosition(ctx)
						}
					}}
					className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
				>
					Reset Hole Position
				</button>
			</div>

			{/* IMU Data Display */}
			<div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
				<div className="text-center p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
					<div className="text-lg font-semibold text-macaw">
						Roll: {(sensorDataClass.roll[sensorDataClass.roll.length - 1] || 0).toFixed(1)}°
					</div>
					<div className="text-xs text-eel">Controls X movement</div>
				</div>
				<div className="text-center p-3 bg-green-50 dark:bg-green-900 rounded-lg">
					<div className="text-lg font-semibold text-chargingGreen">
						Pitch: {(sensorDataClass.pitch[sensorDataClass.pitch.length - 1] || 0).toFixed(1)}°
					</div>
					<div className="text-xs text-eel">Controls Y movement</div>
				</div>
			</div>
		</div>
	)
}

export default observer(MeetPipS5P5BallMoving)
