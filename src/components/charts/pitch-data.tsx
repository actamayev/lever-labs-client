"use client"
/* eslint-disable @typescript-eslint/naming-convention */
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	ReferenceLine,
} from "recharts"
import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card"
import { useLabDemoContext } from "../../contexts/lab-demo-context"

const centerAngle = 94
const angleDeviation = 30

// Configuration
const MAX_POINTS = 100 // Maximum number of points to display
const Y_DOMAIN = [centerAngle - angleDeviation, centerAngle + angleDeviation]
const SAMPLE_INTERVAL = 20 // milliseconds between samples

interface ChartData {
	angle: number
    time: number
}

function AngleVisualization () {
	const labDemoClass = useLabDemoContext()
	const [formattedData, setFormattedData] = useState<ChartData[]>([])

	// Update formatted data whenever pitchData changes
	useEffect(() => {
		if (isEmpty(labDemoClass.pitchData)) return

		// Take the most recent MAX_POINTS from the array
		const recentData = labDemoClass.pitchData.slice(-MAX_POINTS)

		// Format for Recharts, adding relative time
		const chartData = recentData.map((angle, index) => ({
			angle,
			// Use index * sample interval for time display
			time: index * SAMPLE_INTERVAL / 1000 // Convert to seconds
		}))

		setFormattedData(chartData)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [labDemoClass.pitchData.length])

	// Format time for x-axis
	const formatXAxis = (time: number): string => {
		return `${time.toFixed(1)}s`
	}

	return (
		<Card className="w-full h-96">
			<CardHeader>
				<CardTitle className="flex justify-between items-center">
					<span>Pitch Angle Data</span>
					<span className="text-sm font-normal">
						{formattedData.length > 0 ? (
							`Latest: ${formattedData[formattedData.length - 1]?.angle.toFixed(1)}°`
						) : (
							"No data"
						)}
					</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="h-80">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						data={formattedData}
						margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
					>
						<CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
						<XAxis
							dataKey="time"
							tickFormatter={formatXAxis}
							className="text-xs"
						/>
						<YAxis
							domain={Y_DOMAIN}
							label={{ value: "Angle (degrees)", angle: -centerAngle, position: "insideLeft" }}
							className="text-xs"
						/>
						<Tooltip
							labelFormatter={(time) => `Time: ${formatXAxis(time)}`}
							formatter={(value: number) => [`${value.toFixed(1)}°`, "Angle"]}
							contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: "6px" }}
						/>
						<ReferenceLine y={centerAngle} stroke="#FF7A45" strokeDasharray="3 3" />
						<Line
							type="monotone"
							dataKey="angle"
							stroke="#2563EB"
							strokeWidth={2}
							dot={false}
							isAnimationActive={false}
						/>
					</LineChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	)
}

export default observer(AngleVisualization)
