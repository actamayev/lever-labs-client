
"use client"

import { useEffect, useMemo, useRef } from "react"
import { observer } from "mobx-react"
import sensorDataClass from "../../../../classes/sensor-data-class"
import careerQuestTrigger from "../../../../utils/career-quest/career-quest-trigger"
import { CareerType, MeetPipTriggerType } from "@lever-labs/common-ts/protocol"

// eslint-disable-next-line max-lines-per-function
function MeetPipS8P3ColorViz(): React.ReactNode {
	const hasExitedRef = useRef(false)
	const hasInitializedRef = useRef(false)

	// Fire ENTER on mount, EXIT on unmount/page hide/refresh. Guard against double-sends.
	useEffect((): (() => void) => {
		console.log("MeetPipS8P3ColorViz mounted")

		// Delay trigger slightly to allow serial connection to establish if needed
		const triggerTimeout = setTimeout((): void => {
			careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S8_P3_ENTER)
		}, 100)

		const sendExitIfNeeded = (): void => {
			if (hasExitedRef.current) return
			console.log("MeetPipS8P3ColorViz exiting")
			hasExitedRef.current = true
			careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S8_P3_EXIT)
		}

		const handleVisibilityChange = (): void => {
			if (document.visibilityState === "hidden") {
				sendExitIfNeeded()
			}
		}

		const handleBeforeUnload = (): void => {
			sendExitIfNeeded()
		}

		document.addEventListener("visibilitychange", handleVisibilityChange)
		window.addEventListener("beforeunload", handleBeforeUnload)

		// React 18 StrictMode mounts effects twice in dev: first cleanup is a probe; ignore EXIT there
		if (!hasInitializedRef.current) {
			hasInitializedRef.current = true
			return (): void => {
				clearTimeout(triggerTimeout)
				document.removeEventListener("visibilitychange", handleVisibilityChange)
				window.removeEventListener("beforeunload", handleBeforeUnload)
				// Skip EXIT on the initial StrictMode cleanup
			}
		}

		return (): void => {
			clearTimeout(triggerTimeout)
			document.removeEventListener("visibilitychange", handleVisibilityChange)
			window.removeEventListener("beforeunload", handleBeforeUnload)
			sendExitIfNeeded()
		}
	}, [])

	// Get latest RGB values
	const latestRed = useMemo((): number => {
		return sensorDataClass.redValue.length > 0
			? sensorDataClass.redValue[sensorDataClass.redValue.length - 1]
			: 0
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sensorDataClass.redValue, sensorDataClass.dataVersion])

	const latestGreen = useMemo((): number => {
		return sensorDataClass.greenValue.length > 0
			? sensorDataClass.greenValue[sensorDataClass.greenValue.length - 1]
			: 0
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sensorDataClass.greenValue, sensorDataClass.dataVersion])

	const latestBlue = useMemo((): number => {
		return sensorDataClass.blueValue.length > 0
			? sensorDataClass.blueValue[sensorDataClass.blueValue.length - 1]
			: 0
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sensorDataClass.blueValue, sensorDataClass.dataVersion])

	// Create RGB color string
	const rgbColor = `rgb(${latestRed}, ${latestGreen}, ${latestBlue})`

	// Calculate circle size
	const circleSize = 200

	return (
		<div className="space-y-6">
			<div className="flex justify-center">
				<div className="text-center">
					{/* Color Circle */}
					<div
						className="rounded-full border-2 border-swan"
						style={{
							width: circleSize,
							height: circleSize,
							backgroundColor: rgbColor,
						}}
					/>

					{/* RGB Values Display */}
					<div className="mt-6 space-y-2">
						<div className="text-lg font-semibold text-eel">
							RGB: ({latestRed}, {latestGreen}, {latestBlue})
						</div>
					</div>
				</div>
			</div>

			{/* Individual Color Bars */}
			<div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
				<div className="text-center">
					<div
						className="w-16 h-16 rounded-lg mx-auto mb-2 border border-swan"
						style={{ backgroundColor: `rgb(${latestRed}, 0, 0)` }}
					/>
					<div className="text-sm font-medium text-cardinal flex justify-center items-center gap-1">
						<span>Red:</span>
						<span className="inline-block w-8 text-left">{latestRed}</span>
					</div>
				</div>
				<div className="text-center">
					<div
						className="w-16 h-16 rounded-lg mx-auto mb-2 border border-swan"
						style={{ backgroundColor: `rgb(0, ${latestGreen}, 0)` }}
					/>
					<div className="text-sm font-medium text-chargingGreen flex justify-center items-center gap-1">
						<span>Green:</span>
						<span className="inline-block w-8 text-left">{latestGreen}</span>
					</div>
				</div>
				<div className="text-center">
					<div
						className="w-16 h-16 rounded-lg mx-auto mb-2 border border-swan"
						style={{ backgroundColor: `rgb(0, 0, ${latestBlue})` }}
					/>
					<div className="text-sm font-medium text-macaw flex justify-center items-center gap-1">
						<span>Blue:</span>
						<span className="inline-block w-8 text-left">{latestBlue}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default observer(MeetPipS8P3ColorViz)
