"use client"

import { observer } from "mobx-react"
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../../shadcn/ui/card"
import sensorDataClass from "../../../classes/sensor-data-class"
import { useMemo } from "react"

// eslint-disable-next-line max-lines-per-function
function IntroductionS6P6TofsViz() {
	// Get latest TOF count values
	const leftTofCount = useMemo(() => {
		return sensorDataClass.leftSideTofCounts.length > 0
			? sensorDataClass.leftSideTofCounts[sensorDataClass.leftSideTofCounts.length - 1]
			: 0
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sensorDataClass.leftSideTofCounts, sensorDataClass.dataVersion])

	const rightTofCount = useMemo(() => {
		return sensorDataClass.rightSideTofCounts.length > 0
			? sensorDataClass.rightSideTofCounts[sensorDataClass.rightSideTofCounts.length - 1]
			: 0
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sensorDataClass.rightSideTofCounts, sensorDataClass.dataVersion])

	// Format data for charts
	const leftTofData = useMemo(() => [
		{ sensor: "Left TOF", count: leftTofCount }
	], [leftTofCount])

	const rightTofData = useMemo(() => [
		{ sensor: "Right TOF", count: rightTofCount }
	], [rightTofCount])

	// Chart configuration
	const chartConfig = {
		margin: { top: 20, right: 20, left: 20, bottom: 20 },
		barSize: 60,
		fill: "#2563EB", // Blue color for both charts
	}

	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold text-center mb-6">TOF Sensor Readings</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Left TOF Chart */}
				<Card className="h-80">
					<CardHeader className="pb-2">
						<CardTitle className="text-lg text-center">Left TOF Sensor</CardTitle>
					</CardHeader>
					<CardContent className="h-60">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={leftTofData} margin={chartConfig.margin}>
								<CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
								<XAxis
									dataKey="sensor"
									className="text-xs"
									tick={false}
								/>
								<YAxis
									domain={[0, 4000]}
									className="text-xs"
									label={{ value: "Count", angle: -90, position: "insideLeft" }}
								/>
								<Tooltip
									formatter={(value: number) => [`${value.toLocaleString()}`, "Count"]}
									labelFormatter={() => "Left TOF"}
								/>
								<Bar
									dataKey="count"
									fill={chartConfig.fill}
									radius={[4, 4, 0, 0]}
								/>
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				{/* Right TOF Chart */}
				<Card className="h-80">
					<CardHeader className="pb-2">
						<CardTitle className="text-lg text-center">Right TOF Sensor</CardTitle>
					</CardHeader>
					<CardContent className="h-60">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={rightTofData} margin={chartConfig.margin}>
								<CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
								<XAxis
									dataKey="sensor"
									className="text-xs"
									tick={false}
								/>
								<YAxis
									domain={[0, 2600]}
									className="text-xs"
									label={{ value: "Count", angle: -90, position: "insideLeft" }}
								/>
								<Tooltip
									formatter={(value: number) => [`${value.toLocaleString()}`, "Count"]}
									labelFormatter={() => "Right TOF"}
								/>
								<Bar
									dataKey="count"
									fill={chartConfig.fill}
									radius={[4, 4, 0, 0]}
								/>
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>

			{/* Current Values Display */}
			<div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
				<div className="text-center p-4 bg-blue-50 rounded-lg">
					<div className="text-2xl font-bold text-blue-600">
						{leftTofCount.toLocaleString()}
					</div>
					<div className="text-sm text-gray-600">Left TOF Count</div>
				</div>
				<div className="text-center p-4 bg-blue-50 rounded-lg">
					<div className="text-2xl font-bold text-blue-600">
						{rightTofCount.toLocaleString()}
					</div>
					<div className="text-sm text-gray-600">Right TOF Count</div>
				</div>
			</div>

			{/* Data Summary */}
			<div className="text-center text-sm text-gray-600">
				<div>Range: 0 - 30,000 counts</div>
				<div>Higher counts = more light absorption</div>
			</div>
		</div>
	)
}

export default observer(IntroductionS6P6TofsViz)
