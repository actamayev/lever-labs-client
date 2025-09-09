"use client"

import { observer } from "mobx-react"
import { useMemo } from "react"
import getSensorDataClass from "../../../classes/sensor-data-class"

function MeetPipS8P3ColorViz(): React.ReactNode {
	// Get latest RGB values
	const latestRed = useMemo((): number => {
		return getSensorDataClass().redValue.length > 0
			? getSensorDataClass().redValue[getSensorDataClass().redValue.length - 1]
			: 0
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getSensorDataClass().redValue, getSensorDataClass().dataVersion])

	const latestGreen = useMemo((): number => {
		return getSensorDataClass().greenValue.length > 0
			? getSensorDataClass().greenValue[getSensorDataClass().greenValue.length - 1]
			: 0
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getSensorDataClass().greenValue, getSensorDataClass().dataVersion])

	const latestBlue = useMemo((): number => {
		return getSensorDataClass().blueValue.length > 0
			? getSensorDataClass().blueValue[getSensorDataClass().blueValue.length - 1]
			: 0
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getSensorDataClass().blueValue, getSensorDataClass().dataVersion])

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
						className="rounded-full border-4 border-hare"
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
					<div className="text-sm font-medium text-cardinal">Red: {latestRed}</div>
				</div>
				<div className="text-center">
					<div
						className="w-16 h-16 rounded-lg mx-auto mb-2 border border-swan"
						style={{ backgroundColor: `rgb(0, ${latestGreen}, 0)` }}
					/>
					<div className="text-sm font-medium text-chargingGreen">Green: {latestGreen}</div>
				</div>
				<div className="text-center">
					<div
						className="w-16 h-16 rounded-lg mx-auto mb-2 border border-swan"
						style={{ backgroundColor: `rgb(0, 0, ${latestBlue})` }}
					/>
					<div className="text-sm font-medium text-macaw">Blue: {latestBlue}</div>
				</div>
			</div>
		</div>
	)
}

export default observer(MeetPipS8P3ColorViz)
