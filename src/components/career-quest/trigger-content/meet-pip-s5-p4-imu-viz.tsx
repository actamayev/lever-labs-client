"use client"

import { useMemo } from "react"
import { observer } from "mobx-react"
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../../shadcn/ui/card"
import sensorDataClass from "../../../classes/sensor-data-class"

// eslint-disable-next-line max-lines-per-function
function MeetPipS5P4ImuViz(): React.ReactNode {
	// Calculate linear acceleration magnitude from aX, aY, aZ
	const linearAccelerationData = useMemo((): { index: number, value: number }[] => {
		return sensorDataClass.aX.map((ax, index): { index: number, value: number } => {
			const ay = sensorDataClass.aY[index] || 0
			const az = sensorDataClass.aZ[index] || 0
			const magnitude = Math.sqrt(ax * ax + ay * ay + az * az)
			return {
				index,
				value: magnitude,
			}
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sensorDataClass.aX, sensorDataClass.aY, sensorDataClass.aZ, sensorDataClass.dataVersion])

	// Format data for yaw, pitch, roll charts
	const yawData = useMemo((): { index: number, value: number }[] => {
		return sensorDataClass.yaw.map((value, index): { index: number, value: number } => ({
			index,
			value,
		}))
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sensorDataClass.yaw, sensorDataClass.dataVersion])

	const pitchData = useMemo((): { index: number, value: number }[] => {
		return sensorDataClass.pitch.map((value, index): { index: number, value: number } => ({
			index,
			value,
		}))
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sensorDataClass.pitch, sensorDataClass.dataVersion])

	const rollData = useMemo((): { index: number, value: number }[] => {
		return sensorDataClass.roll.map((value, index): { index: number, value: number } => ({
			index,
			value,
		}))
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sensorDataClass.roll, sensorDataClass.dataVersion])

	// Chart configuration
	const chartConfig = {
		margin: { top: 10, right: 10, left: 10, bottom: 10 },
		strokeWidth: 2,
		dot: false,
		isAnimationActive: false,
	}

	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold text-center mb-6">IMU Sensor Data Visualization</h2>

			<div className="grid grid-cols-2 gap-6">
				{/* Yaw Chart */}
				<Card className="h-64">
					<CardHeader className="pb-2">
						<CardTitle className="text-lg">Yaw (Heading)</CardTitle>
					</CardHeader>
					<CardContent className="h-48">
						<LineChart data={yawData} margin={chartConfig.margin} width={280} height={192}>
							<CartesianGrid strokeDasharray="3 3" className="stroke-swan" />
							<XAxis
								dataKey="index"
								className="text-xs"
								tick={false}
							/>
							<YAxis
								className="text-xs"
								label={{ value: "Degrees", angle: -90, position: "insideLeft" }}
							/>
							<Tooltip
								formatter={(value: number): string[] => [`${value.toFixed(1)}°`, "Yaw"]}
								labelFormatter={(): string => "Sample"}
							/>
							<Line
								type="monotone"
								dataKey="value"
								stroke="#2563EB"
								strokeWidth={chartConfig.strokeWidth}
								dot={chartConfig.dot}
								isAnimationActive={chartConfig.isAnimationActive}
							/>
						</LineChart>
					</CardContent>
				</Card>

				{/* Pitch Chart */}
				<Card className="h-64">
					<CardHeader className="pb-2">
						<CardTitle className="text-lg">Pitch (Forward/Backward)</CardTitle>
					</CardHeader>
					<CardContent className="h-48">
						<LineChart data={pitchData} margin={chartConfig.margin} width={280} height={192}>
							<CartesianGrid strokeDasharray="3 3" className="stroke-swan" />
							<XAxis
								dataKey="index"
								className="text-xs"
								tick={false}
							/>
							<YAxis
								className="text-xs"
								label={{ value: "Degrees", angle: -90, position: "insideLeft" }}
							/>
							<Tooltip
								formatter={(value: number): string[] => [`${value.toFixed(1)}°`, "Pitch"]}
								labelFormatter={(): string => "Sample"}
							/>
							<Line
								type="monotone"
								dataKey="value"
								stroke="#DC2626"
								strokeWidth={chartConfig.strokeWidth}
								dot={chartConfig.dot}
								isAnimationActive={chartConfig.isAnimationActive}
							/>
						</LineChart>
					</CardContent>
				</Card>

				{/* Roll Chart */}
				<Card className="h-64">
					<CardHeader className="pb-2">
						<CardTitle className="text-lg">Roll (Left/Right)</CardTitle>
					</CardHeader>
					<CardContent className="h-48">
						<LineChart data={rollData} margin={chartConfig.margin} width={280} height={192}>
							<CartesianGrid strokeDasharray="3 3" className="stroke-swan" />
							<XAxis
								dataKey="index"
								className="text-xs"
								tick={false}
							/>
							<YAxis
								className="text-xs"
								label={{ value: "Degrees", angle: -90, position: "insideLeft" }}
							/>
							<Tooltip
								formatter={(value: number): string[] => [`${value.toFixed(1)}°`, "Roll"]}
								labelFormatter={(): string => "Sample"}
							/>
							<Line
								type="monotone"
								dataKey="value"
								stroke="#059669"
								strokeWidth={chartConfig.strokeWidth}
								dot={chartConfig.dot}
								isAnimationActive={chartConfig.isAnimationActive}
							/>
						</LineChart>
					</CardContent>
				</Card>

				{/* Linear Acceleration Chart */}
				<Card className="h-64">
					<CardHeader className="pb-2">
						<CardTitle className="text-lg">Linear Acceleration</CardTitle>
					</CardHeader>
					<CardContent className="h-48">
						<LineChart data={linearAccelerationData} margin={chartConfig.margin} width={280} height={192}>
							<CartesianGrid strokeDasharray="3 3" className="stroke-swan" />
							<XAxis
								dataKey="index"
								className="text-xs"
								tick={false}
							/>
							<YAxis
								className="text-xs"
								label={{ value: "m/s²", angle: -90, position: "insideLeft" }}
							/>
							<Tooltip
								formatter={(value: number): string[] => [`${value.toFixed(2)} m/s²`, "Acceleration"]}
								labelFormatter={(): string => "Sample"}
							/>
							<Line
								type="monotone"
								dataKey="value"
								stroke="#7C3AED"
								strokeWidth={chartConfig.strokeWidth}
								dot={chartConfig.dot}
								isAnimationActive={chartConfig.isAnimationActive}
							/>
						</LineChart>
					</CardContent>
				</Card>
			</div>

			{/* Data Summary */}
			<div className="grid grid-cols-4 gap-4 mt-6">
				<div className="text-center p-4 bg-blue-50 rounded-lg">
					<div className="text-2xl font-bold text-macaw">
						{sensorDataClass.yaw.length > 0 ? sensorDataClass.yaw[sensorDataClass.yaw.length - 1].toFixed(1) : "0.0"}°
					</div>
					<div className="text-sm text-eel">Yaw</div>
				</div>
				<div className="text-center p-4 bg-red-50 rounded-lg">
					<div className="text-2xl font-bold text-cardinal">
						{sensorDataClass.pitch.length > 0 ? sensorDataClass.pitch[sensorDataClass.pitch.length - 1].toFixed(1) : "0.0"}°
					</div>
					<div className="text-sm text-eel">Pitch</div>
				</div>
				<div className="text-center p-4 bg-green-50 rounded-lg">
					<div className="text-2xl font-bold text-chargingGreen">
						{sensorDataClass.roll.length > 0 ? sensorDataClass.roll[sensorDataClass.roll.length - 1].toFixed(1) : "0.0"}°
					</div>
					<div className="text-sm text-eel">Roll</div>
				</div>
				<div className="text-center p-4 bg-purple-50 rounded-lg">
					<div className="text-2xl font-bold text-beetle">
						{linearAccelerationData.length > 0 ?
							linearAccelerationData[linearAccelerationData.length - 1].value.toFixed(2) : "0.00"} m/s²
					</div>
					<div className="text-sm text-eel">Acceleration</div>
				</div>
			</div>
		</div>
	)
}

export default observer(MeetPipS5P4ImuViz)
