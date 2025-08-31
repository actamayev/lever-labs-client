"use client"

import { observer } from "mobx-react"
import { useMemo } from "react"
import sensorDataClass from "../../../classes/sensor-data-class"

function IntroductionS8P3ColorViz() {
	// Get latest RGB values
	const latestRed = useMemo(() => {
		return sensorDataClass.redValue.length > 0
			? sensorDataClass.redValue[sensorDataClass.redValue.length - 1]
			: 0
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sensorDataClass.redValue])

	const latestGreen = useMemo(() => {
		return sensorDataClass.greenValue.length > 0
			? sensorDataClass.greenValue[sensorDataClass.greenValue.length - 1]
			: 0
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sensorDataClass.greenValue])

	const latestBlue = useMemo(() => {
		return sensorDataClass.blueValue.length > 0
			? sensorDataClass.blueValue[sensorDataClass.blueValue.length - 1]
			: 0
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sensorDataClass.blueValue])

	// Create RGB color string
	const rgbColor = `rgb(${latestRed}, ${latestGreen}, ${latestBlue})`

	// Calculate circle size
	const circleSize = 200

	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold text-center mb-6">Color Sensor Visualization</h2>

			<div className="flex justify-center">
				<div className="text-center">
					{/* Color Circle */}
					<div
						className="rounded-full border-4 border-gray-300 shadow-lg"
						style={{
							width: circleSize,
							height: circleSize,
							backgroundColor: rgbColor,
						}}
					/>

					{/* RGB Values Display */}
					<div className="mt-6 space-y-2">
						<div className="text-lg font-semibold text-gray-700">
							RGB: ({latestRed}, {latestGreen}, {latestBlue})
						</div>
						<div className="text-sm text-gray-500">
							Live color from sensor
						</div>
					</div>
				</div>
			</div>

			{/* Individual Color Bars */}
			<div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
				<div className="text-center">
					<div
						className="w-16 h-16 rounded-lg mx-auto mb-2 border border-gray-300"
						style={{ backgroundColor: `rgb(${latestRed}, 0, 0)` }}
					/>
					<div className="text-sm font-medium text-cardinal">Red: {latestRed}</div>
				</div>
				<div className="text-center">
					<div
						className="w-16 h-16 rounded-lg mx-auto mb-2 border border-gray-300"
						style={{ backgroundColor: `rgb(0, ${latestGreen}, 0)` }}
					/>
					<div className="text-sm font-medium text-green-600">Green: {latestGreen}</div>
				</div>
				<div className="text-center">
					<div
						className="w-16 h-16 rounded-lg mx-auto mb-2 border border-gray-300"
						style={{ backgroundColor: `rgb(0, 0, ${latestBlue})` }}
					/>
					<div className="text-sm font-medium text-macaw-3">Blue: {latestBlue}</div>
				</div>
			</div>

			{/* Data Summary */}
			<div className="text-center text-sm text-gray-600">
				<div>Data Points: {Math.max(sensorDataClass.redValue.length, sensorDataClass.greenValue.length, sensorDataClass.blueValue.length)}</div>
				<div>Real-time color detection</div>
			</div>
		</div>
	)
}

export default observer(IntroductionS8P3ColorViz)
