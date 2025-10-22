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
	ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card"
import sensorDataClass from "../../../../classes/sensor-data-class"
import { MeetPipTriggerType, CareerType } from "@lever-labs/common-ts/protocol"
import useCareerQuestTrigger from "../../../../hooks/career-quest/use-career-quest-trigger"

// eslint-disable-next-line max-lines-per-function
function MeetPipS5P4ImuViz(): React.ReactNode {
	useCareerQuestTrigger(
		CareerType.MEET_PIP,
		MeetPipTriggerType.S5_P4_ENTER,
		MeetPipTriggerType.S5_P4_EXIT,
		{ enterDelayMs: 100, enabled: true }
	)
	// Calculate linear acceleration magnitude from aX, aY, aZ
	const linearAccelerationData = useMemo((): { index: number, value: number }[] => {
		return sensorDataClass.aX.map((ax, index): { index: number, value: number } => {
			const ay = sensorDataClass.aY[index] || 0
			const az = sensorDataClass.aZ[index] || 0
			const magnitude = Math.sqrt(ax * ax + ay * ay + az * az)
			return {
				index,
				value: magnitude - 9.81,
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
		strokeWidth: 2,
		dot: false,
		isAnimationActive: false,
	}

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
				{/* Yaw Chart */}
				<Card className="h-56">
					<CardHeader className="pb-2">
						<CardTitle className="text-lg">Yaw (Heading)</CardTitle>
					</CardHeader>
					<CardContent className="h-4/5">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart
								data={yawData}
								// reduce the chart's left margin so recharts doesn't add extra space
								margin={{ top: 0, right: 8, bottom: 0, left: 0 }}
							>
								<CartesianGrid strokeDasharray="3 3" className="stroke-swan" />
								<XAxis
									dataKey="index"
									className="text-xs"
									tick={false}
								/>
								<YAxis
									className="text-xs"
									width={36}
									label={{
										value: "Degrees",
										angle: -90,
										position: "insideLeft",
										dx: 6,   // positive moves the label right (toward the axis) — tweak as needed
										dy: 0,
									}}
									domain={[-180, 180]}
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
						</ResponsiveContainer>
					</CardContent>
				</Card>

				{/* Pitch Chart */}
				<Card className="h-56">
					<CardHeader className="pb-2">
						<CardTitle className="text-lg">Pitch (Forward/Backward)</CardTitle>
					</CardHeader>
					<CardContent className="h-4/5">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart
								data={pitchData}
								// reduce the chart's left margin so recharts doesn't add extra space
								margin={{ top: 0, right: 8, bottom: 0, left: 0 }}
							>
								<CartesianGrid strokeDasharray="3 3" className="stroke-swan" />
								<XAxis
									dataKey="index"
									className="text-xs"
									tick={false}
								/>
								<YAxis
									className="text-xs"
									// reduce the reserved axis width (default can be large)
									width={36}
									// place the label inside the plot area and nudge it toward the axis
									label={{
										value: "Degrees",
										angle: -90,
										position: "insideLeft",
										dx: 6,   // positive moves the label right (toward the axis) — tweak as needed
										dy: 0,
									}}
									domain={[-180, 180]}
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
						</ResponsiveContainer>
					</CardContent>
				</Card>

				{/* Roll Chart */}
				<Card className="h-56">
					<CardHeader className="pb-2">
						<CardTitle className="text-lg">Roll (Left/Right)</CardTitle>
					</CardHeader>
					<CardContent className="h-4/5">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart
								data={rollData}
								// reduce the chart's left margin so recharts doesn't add extra space
								margin={{ top: 0, right: 8, bottom: 0, left: 0 }}
							>
								<CartesianGrid strokeDasharray="3 3" className="stroke-swan" />
								<XAxis
									dataKey="index"
									className="text-xs"
									tick={false}
								/>
								<YAxis
									className="text-xs"
									// reduce the reserved axis width (default can be large)
									width={36}
									// place the label inside the plot area and nudge it toward the axis
									label={{
										value: "Degrees",
										angle: -90,
										position: "insideLeft",
										dx: 6,   // positive moves the label right (toward the axis) — tweak as needed
										dy: 0,
									}}
									domain={[-180, 180]}
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
						</ResponsiveContainer>
					</CardContent>
				</Card>

				{/* Linear Acceleration Chart */}
				<Card className="h-56">
					<CardHeader className="pb-2">
						<CardTitle className="text-lg">Shake</CardTitle>
					</CardHeader>
					<CardContent className="h-4/5">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart
								data={linearAccelerationData}
								// reduce the chart's left margin so recharts doesn't add extra space
								margin={{ top: 0, right: 8, bottom: 0, left: 0 }}
							>
								<CartesianGrid strokeDasharray="3 3" className="stroke-swan" />
								<XAxis
									dataKey="index"
									className="text-xs"
									tick={false}
								/>
								<YAxis
									className="text-xs"
									// reduce the reserved axis width (default can be large)
									width={36}
									// place the label inside the plot area and nudge it toward the axis
									label={{
										value: "m/s²",
										angle: -90,
										position: "insideLeft",
										dx: 6,   // positive moves the label right (toward the axis) — tweak as needed
										dy: 0,
									}}
								/>
								<Tooltip
									formatter={(value: number): string[] => [`${value.toFixed(2)} m/s²`, "Shake"]}
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
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export default observer(MeetPipS5P4ImuViz)
