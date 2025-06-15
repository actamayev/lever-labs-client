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
import React, { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/shadcn/ui/card"
import { Button } from "@/components/shadcn/ui/button"
import { Slider } from "@/components/shadcn/ui/slider"
import { useGarageContext } from "../../classes/garage-context"

// Configuration
const centerAngle = 94
const angleDeviation = 30
const MAX_POINTS = 100 // Maximum number of points to display
const Y_DOMAIN = [centerAngle - angleDeviation, centerAngle + angleDeviation] // Set domain to 64-124
const SAMPLE_INTERVAL = 10 // milliseconds between samples

interface ChartData {
	angle: number
	time: number
}

// eslint-disable-next-line max-lines-per-function
function AngleVisualization() {
	const garageClass = useGarageContext()
	const [formattedData, setFormattedData] = useState<ChartData[]>([])
	const [isPaused, setIsPaused] = useState(false)
	const [historyPosition, setHistoryPosition] = useState(100) // 0-100 percentage
	const allDataRef = useRef<ChartData[]>([])

	// Update all data when new pitch data comes in
	useEffect(() => {
		if (isEmpty(garageClass.pitchData)) return

		// Format all data
		const chartData = garageClass.pitchData.map((angle, index) => ({
			angle,
			time: index * SAMPLE_INTERVAL / 1000 // Convert to seconds
		}))

		allDataRef.current = chartData

		// Only update displayed data if not paused
		if (!isPaused) {
			updateDisplayedData(100) // Show most recent data
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [garageClass.pitchData.length, isPaused])

	// Function to update displayed data based on history position
	const updateDisplayedData = (position: number) => {
		const allData = allDataRef.current
		if (isEmpty(allData)) return

		setHistoryPosition(position)

		// Calculate which chunk of data to display based on position slider
		let startIdx = 0
		if (allData.length > MAX_POINTS) {
			// Calculate start index based on position (0 = beginning, 100 = end)
			const maxStartIdx = allData.length - MAX_POINTS
			startIdx = Math.floor((position / 100) * maxStartIdx)
		}

		// Get the slice of data to display
		const dataSlice = allData.slice(startIdx, startIdx + MAX_POINTS)

		// Adjust time values to be relative to first point in the slice
		const baseTime = dataSlice[0]?.time || 0
		const adjustedData = dataSlice.map(point => ({
			...point,
			time: point.time - baseTime
		}))

		setFormattedData(adjustedData)
	}

	// Handle pause/resume
	const togglePause = () => {
		setIsPaused(prev => !prev)
	}

	// Handle slider change
	const handleSliderChange = (value: number[]) => {
		updateDisplayedData(value[0])
	}

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
			<CardContent className="h-64">
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
							domain={Y_DOMAIN} // Set fixed domain to 64-124 degrees
							allowDataOverflow={true} // This allows points to be calculated but not shown outside the domain
							label={{ value: "Angle (degrees)", angle: -90, position: "insideLeft" }}
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
							connectNulls={false} // Prevents connecting across gaps (outside domain values)
						/>
					</LineChart>
				</ResponsiveContainer>
			</CardContent>
			<CardFooter className="flex flex-col gap-2">
				<div className="flex items-center justify-between w-full">
					<Button
						variant={isPaused ? "default" : "outline"}
						size="sm"
						onClick={togglePause}
					>
						{isPaused ? "Resume" : "Pause"}
					</Button>
					<span className="text-xs text-muted-foreground">
						{isPaused ? "Viewing historical data" : "Live data"}
					</span>
				</div>
				{isPaused && (
					<div className="w-full pt-2">
						<Slider
							value={[historyPosition]}
							min={0}
							max={100}
							step={1}
							onValueChange={handleSliderChange}
						/>
						<div className="flex justify-between text-xs text-muted-foreground mt-1">
							<span>Older</span>
							<span>Newer</span>
						</div>
					</div>
				)}
			</CardFooter>
		</Card>
	)
}

export default observer(AngleVisualization)
