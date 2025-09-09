"use client"

import { observer } from "mobx-react"
import { useEffect, useRef, useState } from "react"
import sensorDataClass from "../../../classes/sensor-data-class"

// eslint-disable-next-line max-lines-per-function
function MeetPipS9P6EncoderViz(): React.ReactNode {
	const leftWheelRef = useRef<HTMLCanvasElement>(null)
	const rightWheelRef = useRef<HTMLCanvasElement>(null)
	const leftAnimationRef = useRef<number>()
	const rightAnimationRef = useRef<number>()
	const [leftRotation, setLeftRotation] = useState(0)
	const [rightRotation, setRightRotation] = useState(0)

	// Wheel configuration
	const wheelSize = 200
	const centerX = wheelSize / 2
	const centerY = wheelSize / 2
	const wheelRadius = 100

	// Enhanced wheel drawing function
	const drawWheel = (ctx: CanvasRenderingContext2D, rotation: number): void => {
		// Clear canvas
		ctx.clearRect(0, 0, wheelSize, wheelSize)

		// Save context for rotation
		ctx.save()
		ctx.translate(centerX, centerY)
		ctx.rotate((rotation * Math.PI) / 180)

		// Create gradient for wheel rim
		const rimGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, wheelRadius)
		rimGradient.addColorStop(0, "#1f2937") // Dark center
		rimGradient.addColorStop(0.3, "#374151") // Medium
		rimGradient.addColorStop(0.7, "#4b5563") // Lighter
		rimGradient.addColorStop(1, "#6b7280") // Light edge

		// Draw outer wheel rim without external shadow
		ctx.fillStyle = rimGradient
		ctx.beginPath()
		ctx.arc(0, 0, wheelRadius, 0, 2 * Math.PI)
		ctx.fill()

		// Draw inner wheel rim (tire)
		const tireGradient = ctx.createRadialGradient(0, 0, wheelRadius * 0.7, 0, 0, wheelRadius)
		tireGradient.addColorStop(0, "#1f2937") // Dark inner
		tireGradient.addColorStop(1, "#374151") // Medium outer

		ctx.fillStyle = tireGradient
		ctx.beginPath()
		ctx.arc(0, 0, wheelRadius * 0.85, 0, 2 * Math.PI)
		ctx.fill()

		// Draw tire treads
		ctx.strokeStyle = "#1f2937"
		ctx.lineWidth = 2
		for (let i = 0; i < 12; i++) {
			const angle = (i * Math.PI) / 6
			const startRadius = wheelRadius * 0.7
			const endRadius = wheelRadius * 0.85

			ctx.beginPath()
			ctx.moveTo(
				Math.cos(angle) * startRadius,
				Math.sin(angle) * startRadius
			)
			ctx.lineTo(
				Math.cos(angle) * endRadius,
				Math.sin(angle) * endRadius
			)
			ctx.stroke()
		}

		// Draw wheel spokes with gradient
		const spokeGradient = ctx.createLinearGradient(-wheelRadius * 0.6, 0, wheelRadius * 0.6, 0)
		spokeGradient.addColorStop(0, "#9ca3af")
		spokeGradient.addColorStop(0.5, "#d1d5db")
		spokeGradient.addColorStop(1, "#9ca3af")

		ctx.strokeStyle = spokeGradient
		ctx.lineWidth = 4
		ctx.lineCap = "round"

		for (let i = 0; i < 6; i++) {
			const angle = (i * Math.PI) / 3
			ctx.beginPath()
			ctx.moveTo(0, 0)
			ctx.lineTo(
				Math.cos(angle) * (wheelRadius * 0.6),
				Math.sin(angle) * (wheelRadius * 0.6)
			)
			ctx.stroke()
		}

		// Draw wheel hub with metallic effect
		const hubGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 15)
		hubGradient.addColorStop(0, "#fbbf24") // Gold center
		hubGradient.addColorStop(0.3, "#f59e0b") // Darker gold
		hubGradient.addColorStop(0.7, "#d97706") // Even darker
		hubGradient.addColorStop(1, "#92400e") // Darkest

		ctx.fillStyle = hubGradient
		ctx.beginPath()
		ctx.arc(0, 0, 15, 0, 2 * Math.PI)
		ctx.fill()

		// Draw hub center detail
		ctx.fillStyle = "#1f2937"
		ctx.beginPath()
		ctx.arc(0, 0, 8, 0, 2 * Math.PI)
		ctx.fill()

		// Add subtle highlights for 3D effect
		ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
		ctx.lineWidth = 1
		ctx.beginPath()
		ctx.arc(0, 0, wheelRadius, 0, Math.PI)
		ctx.stroke()

		// Restore context
		ctx.restore()
	}

	// Animation function for left wheel
	const animateLeftWheel = (): void => {
		const canvas = leftWheelRef.current
		if (!canvas) return

		const ctx = canvas.getContext("2d")
		if (!ctx) return

		// Get latest left wheel RPM
		const latestRPM = sensorDataClass.leftWheelRPM[sensorDataClass.leftWheelRPM.length - 1] || 0

		// Convert RPM to rotation speed (degrees per frame)
		// Assuming 60fps, convert RPM to degrees per frame
		const degreesPerFrame = (latestRPM * 360) / (60 * 60) // RPM * 360° / (60fps * 60s)

		// Update rotation
		setLeftRotation((prev): number => prev + degreesPerFrame)

		// Draw the enhanced wheel
		drawWheel(ctx, leftRotation)

		leftAnimationRef.current = requestAnimationFrame(animateLeftWheel)
	}

	// Animation function for right wheel
	const animateRightWheel = (): void => {
		const canvas = rightWheelRef.current
		if (!canvas) return

		const ctx = canvas.getContext("2d")
		if (!ctx) return

		// Get latest right wheel RPM
		const latestRPM = sensorDataClass.rightWheelRPM[sensorDataClass.rightWheelRPM.length - 1] || 0

		// Convert RPM to rotation speed (degrees per frame)
		const degreesPerFrame = (latestRPM * 360) / (60 * 60)

		// Update rotation
		setRightRotation((prev): number => prev + degreesPerFrame)

		// Draw the enhanced wheel
		drawWheel(ctx, rightRotation)

		rightAnimationRef.current = requestAnimationFrame(animateRightWheel)
	}

	useEffect((): () => void => {
		// Start animations
		animateLeftWheel()
		animateRightWheel()

		return (): void => {
			// Cleanup animations
			if (leftAnimationRef.current) {
				cancelAnimationFrame(leftAnimationRef.current)
			}
			if (rightAnimationRef.current) {
				cancelAnimationFrame(rightAnimationRef.current)
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sensorDataClass.leftWheelRPM, sensorDataClass.rightWheelRPM, sensorDataClass.dataVersion])

	// Get latest RPM values for display
	const latestLeftRPM = sensorDataClass.leftWheelRPM[sensorDataClass.leftWheelRPM.length - 1] || 0
	const latestRightRPM = sensorDataClass.rightWheelRPM[sensorDataClass.rightWheelRPM.length - 1] || 0

	return (
		<div className="space-y-8">
			<div className="flex justify-center space-x-16">
				{/* Left Wheel */}
				<div className="text-center">
					<div className="relative">
						<canvas
							ref={leftWheelRef}
							width={wheelSize}
							height={wheelSize}
						/>

						{/* Enhanced Speed indicator with defined width */}
						<div className="mt-8 flex justify-center">
							<div className="w-3/4 bg-cardinal px-4 py-2 rounded-full">
								<span className="text-sm font-bold text-white">
									{latestLeftRPM.toFixed(1)} RPM
								</span>
							</div>
						</div>
					</div>
					<div className="mt-8 text-lg font-semibold text-eel bg-red-200 dark:bg-red-800 px-4 py-2 rounded-full">
						Left Wheel
					</div>
				</div>

				{/* Right Wheel */}
				<div className="text-center">
					<div className="relative">
						<canvas
							ref={rightWheelRef}
							width={wheelSize}
							height={wheelSize}
						/>

						{/* Enhanced Speed indicator with defined width */}
						<div className="mt-8 flex justify-center">
							<div className="w-3/4 bg-chargingGreen px-4 py-2 rounded-full">
								<span className="text-sm font-bold text-white">
									{latestRightRPM.toFixed(1)} RPM
								</span>
							</div>
						</div>
					</div>
					<div className="mt-8 text-lg font-semibold text-eel bg-green-200 dark:bg-green-800 px-4 py-2 rounded-full">
						Right Wheel
					</div>
				</div>
			</div>
		</div>
	)
}

export default observer(MeetPipS9P6EncoderViz)
