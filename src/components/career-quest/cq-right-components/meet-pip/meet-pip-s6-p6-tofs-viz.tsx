"use client"

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts"
import { useMemo } from "react"
import { observer } from "mobx-react"
import sensorDataClass from "../../../../classes/sensor-data-class"
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card"
import { CareerType, MeetPipTriggerType } from "@lever-labs/common-ts/protocol"
import useCareerQuestTrigger from "../../../../hooks/career-quest/use-career-quest-trigger"

// eslint-disable-next-line max-lines-per-function
function MeetPipS6P6TofsViz(): React.ReactNode {
	useCareerQuestTrigger(
		CareerType.MEET_PIP,
		MeetPipTriggerType.S6_P6_ENTER,
		MeetPipTriggerType.S6_P6_EXIT,
		{ enterDelayMs: 100, enabled: true }
	)
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
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
				{/* Left TOF Chart */}
				<Card className="h-80">
					<CardHeader className="pb-2">
						<CardTitle className="text-lg text-center">Left TOF Sensor</CardTitle>
					</CardHeader>
					<CardContent className="h-60">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={leftTofData}>
								<CartesianGrid strokeDasharray="3 3" className="stroke-swan" />
								<XAxis
									dataKey="sensor"
									className="text-xs"
									tick={false}
								/>
								<YAxis
									domain={[0, 4000]}
									className="text-xs"
									tick={false}
									mirror={true}
								/>
								<Tooltip
									formatter={(value: number): string[] => [`${value.toLocaleString()}`, "Value"]}
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
							<BarChart data={rightTofData}>
								<CartesianGrid strokeDasharray="3 3" className="stroke-swan" />
								<XAxis
									dataKey="sensor"
									className="text-xs"
									tick={false}
								/>
								<YAxis
									domain={[0, 2000]}
									className="text-xs"
									tick={false}
									mirror={true}
								/>
								<Tooltip
									formatter={(value: number): string[] => [`${value.toLocaleString()}`, "Value"]}
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
		</div>
	)
}

export default observer(MeetPipS6P6TofsViz)
