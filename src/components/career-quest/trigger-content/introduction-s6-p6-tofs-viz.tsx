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
function IntroductionS6P6TofsViz(): React.ReactNode {
	// Get latest TOF count values
	const leftTofCount = useMemo((): number => {
		return sensorDataClass.leftSideTofCounts.length > 0
			? sensorDataClass.leftSideTofCounts[sensorDataClass.leftSideTofCounts.length - 1]
			: 0
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sensorDataClass.leftSideTofCounts, sensorDataClass.dataVersion])

	const rightTofCount = useMemo((): number => {
		return sensorDataClass.rightSideTofCounts.length > 0
			? sensorDataClass.rightSideTofCounts[sensorDataClass.rightSideTofCounts.length - 1]
			: 0
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sensorDataClass.rightSideTofCounts, sensorDataClass.dataVersion])

	// Format data for charts
	const leftTofData = useMemo((): { sensor: string, count: number }[] => [
		{ sensor: "Left TOF", count: leftTofCount }
	], [leftTofCount])

	const rightTofData = useMemo((): { sensor: string, count: number }[] => [
		{ sensor: "Right TOF", count: rightTofCount }
	], [rightTofCount])

	// Chart configuration
	const chartConfig = {
		margin: { top: 20, right: 20, left: 20, bottom: 20 },
		barSize: 60,
		fill: "#1CB0F6", // Macaw color for both charts
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
							<BarChart
								data={leftTofData}
								margin={chartConfig.margin}
							>
								<CartesianGrid strokeDasharray="3 3" className="stroke-swan" />
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
									formatter={(value: number): string[] => [`${value.toLocaleString()}`, "Count"]}
									labelFormatter={(): string => "Left TOF"}
								/>
								<Bar
									dataKey="count"
									fill={chartConfig.fill}
									radius={[4, 4, 0, 0]}
									animationDuration={0} // faster animation
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
								<CartesianGrid strokeDasharray="3 3" className="stroke-swan" />
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
									formatter={(value: number): string[] => [`${value.toLocaleString()}`, "Count"]}
									labelFormatter={(): string => "Right TOF"}
								/>
								<Bar
									dataKey="count"
									fill={chartConfig.fill}
									radius={[4, 4, 0, 0]}
									animationDuration={0} // faster animation
								/>
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>

			{/* Current Values Display */}
			<div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
				<div className="text-center p-4 bg-blue-50 rounded-lg">
					<div className="text-2xl font-bold text-macaw">
						{leftTofCount.toLocaleString()}
					</div>
					<div className="text-sm text-eel">Left TOF Count</div>
				</div>
				<div className="text-center p-4 bg-blue-50 rounded-lg">
					<div className="text-2xl font-bold text-macaw">
						{rightTofCount.toLocaleString()}
					</div>
					<div className="text-sm text-eel">Right TOF Count</div>
				</div>
			</div>

			{/* Data Summary */}
			<div className="text-center text-sm text-eel">
				<div>Range: 0 - 30,000 counts</div>
				<div>Higher counts = more light absorption</div>
			</div>
		</div>
	)
}

export default observer(IntroductionS6P6TofsViz)
