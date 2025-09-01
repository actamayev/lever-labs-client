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
	const wheelSize = 120
	const centerX = wheelSize / 2
	const centerY = wheelSize / 2
	const wheelRadius = 50

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

		// Clear canvas
		ctx.clearRect(0, 0, wheelSize, wheelSize)

		// Save context for rotation
		ctx.save()
		ctx.translate(centerX, centerY)
		ctx.rotate((leftRotation * Math.PI) / 180)

		// Draw wheel hub
		ctx.fillStyle = "#374151"
		ctx.beginPath()
		ctx.arc(0, 0, 8, 0, 2 * Math.PI)
		ctx.fill()

		// Draw wheel rim
		ctx.strokeStyle = "#6B7280"
		ctx.lineWidth = 3
		ctx.beginPath()
		ctx.arc(0, 0, wheelRadius, 0, 2 * Math.PI)
		ctx.stroke()

		// Draw wheel spokes
		ctx.strokeStyle = "#9CA3AF"
		ctx.lineWidth = 2
		for (let i = 0; i < 8; i++) {
			const angle = (i * Math.PI) / 4
			ctx.beginPath()
			ctx.moveTo(0, 0)
			ctx.lineTo(
				Math.cos(angle) * wheelRadius,
				Math.sin(angle) * wheelRadius
			)
			ctx.stroke()
		}

		// Draw direction indicator (red dot)
		ctx.fillStyle = "#DC2626"
		ctx.beginPath()
		ctx.arc(wheelRadius - 5, 0, 4, 0, 2 * Math.PI)
		ctx.fill()

		// Restore context
		ctx.restore()

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

		// Clear canvas
		ctx.clearRect(0, 0, wheelSize, wheelSize)

		// Save context for rotation
		ctx.save()
		ctx.translate(centerX, centerY)
		ctx.rotate((rightRotation * Math.PI) / 180)

		// Draw wheel hub
		ctx.fillStyle = "#374151"
		ctx.beginPath()
		ctx.arc(0, 0, 8, 0, 2 * Math.PI)
		ctx.fill()

		// Draw wheel rim
		ctx.strokeStyle = "#6B7280"
		ctx.lineWidth = 3
		ctx.beginPath()
		ctx.arc(0, 0, wheelRadius, 0, 2 * Math.PI)
		ctx.stroke()

		// Draw wheel spokes
		ctx.strokeStyle = "#9CA3AF"
		ctx.lineWidth = 2
		for (let i = 0; i < 8; i++) {
			const angle = (i * Math.PI) / 4
			ctx.beginPath()
			ctx.moveTo(0, 0)
			ctx.lineTo(
				Math.cos(angle) * wheelRadius,
				Math.sin(angle) * wheelRadius
			)
			ctx.stroke()
		}

		// Draw direction indicator (red dot)
		ctx.fillStyle = "#DC2626"
		ctx.beginPath()
		ctx.arc(wheelRadius - 5, 0, 4, 0, 2 * Math.PI)
		ctx.fill()

		// Restore context
		ctx.restore()

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
		<div className="space-y-6">
			<h2 className="text-2xl font-bold text-center mb-6">Wheel Speed Visualization</h2>

			<div className="flex justify-center space-x-12">
				{/* Left Wheel */}
				<div className="text-center">
					<div className="relative">
						<canvas
							ref={leftWheelRef}
							width={wheelSize}
							height={wheelSize}
							className="border-2 border-swan rounded-full bg-polar"
						/>

						{/* Speed indicator */}
						<div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-red-100 px-3 py-1 rounded-full">
							<span className="text-sm font-semibold text-cardinal">
								{latestLeftRPM.toFixed(1)} RPM
							</span>
						</div>
					</div>
					<div className="mt-12 text-sm font-medium text-eel">Left Wheel</div>
				</div>

				{/* Right Wheel */}
				<div className="text-center">
					<div className="relative">
						<canvas
							ref={rightWheelRef}
							width={wheelSize}
							height={wheelSize}
							className="border-2 border-swan rounded-full bg-polar"
						/>

						{/* Speed indicator */}
						<div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-green-100 px-3 py-1 rounded-full">
							<span className="text-sm font-semibold text-chargingGreen">
								{latestRightRPM.toFixed(1)} RPM
							</span>
						</div>
					</div>
					<div className="mt-12 text-sm font-medium text-eel">Right Wheel</div>
				</div>
			</div>

			{/* Instructions */}
			<div className="text-center text-sm text-wolf mt-8">
				<div>Wheels spin at actual RPM speed from encoder data</div>
				<div>Red dot shows rotation direction</div>
			</div>
		</div>
	)
}

export default observer(MeetPipS9P6EncoderViz)
