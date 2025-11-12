"use client"

import { observer } from "mobx-react"
import { useEffect, useRef } from "react"
import { Gauge, Radar, ScanLine, Palette, GaugeCircle } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent, TabsContents } from "../../ui/shadcn-io/tabs"
import { WORKBENCH_ROUNDING_RADIUS } from "../../../utils/constants/constants"
import garageClass from "../../../classes/garage-class"
import MeetPipS5P4ImuViz from "../../career-quest/cq-right-components/meet-pip/meet-pip-s5-p4-imu-viz"
import MeetPipS6P4MzViz from "../../career-quest/cq-right-components/meet-pip/meet-pip-s6-p4-mz-viz"
import MeetPipS6P6TofsViz from "../../career-quest/cq-right-components/meet-pip/meet-pip-s6-p6-tofs-viz"
import MeetPipS8P3ColorViz from "../../career-quest/cq-right-components/meet-pip/meet-pip-s8-p3-color-viz"
import MeetPipS9P6EncoderViz from "../../career-quest/cq-right-components/meet-pip/meet-pip-s9-p6-encoder-viz"

function SensorDataSection(): React.ReactNode {
	const isInitialMount = useRef(true)

	useEffect((): void => {
		// After the first render, allow animations
		isInitialMount.current = false
	}, [])

	return (
		<div
			className="h-2/3 overflow-hidden border-b border-r border-t border-swan"
			style={{
				borderTopRightRadius: 0,
				borderBottomRightRadius: WORKBENCH_ROUNDING_RADIUS
			}}
		>
			<div className="h-full flex flex-col p-4">
				<Tabs
					value={garageClass.currentSensorDataTab}
					onValueChange={(value): void => {
						garageClass.setCurrentSensorDataTab(value as SensorDataTab)
					}}
					className="w-full h-full flex flex-col"
				>
					<TabsList className="mb-4 bg-polar w-full grid grid-cols-5">
						<TabsTrigger value="imu" className="flex items-center justify-center gap-2 text-xs">
							<Gauge className="h-4 w-4" />
							IMU
						</TabsTrigger>
						<TabsTrigger value="side-distance" className="flex items-center justify-center gap-2 text-xs">
							<Radar className="h-4 w-4" />
							Side Distance
						</TabsTrigger>
						<TabsTrigger value="front-distance" className="flex items-center justify-center gap-2 text-xs">
							<ScanLine className="h-4 w-4" />
							Front Distance
						</TabsTrigger>
						<TabsTrigger value="color" className="flex items-center justify-center gap-2 text-xs">
							<Palette className="h-4 w-4" />
							Color Sensor
						</TabsTrigger>
						<TabsTrigger value="motors" className="flex items-center justify-center gap-2 text-xs">
							<GaugeCircle className="h-4 w-4" />
							Motors
						</TabsTrigger>
					</TabsList>

					<TabsContents
						className="flex-1 overflow-auto"
						transition={isInitialMount.current ? { duration: 0 } : undefined}
					>
						<TabsContent value="imu" className="w-full h-full">
							<MeetPipS5P4ImuViz chartHeight={190} yAxisWidth={25} />
						</TabsContent>

						<TabsContent value="side-distance" className="w-full h-full">
							<MeetPipS6P6TofsViz />
						</TabsContent>

						<TabsContent value="front-distance" className="w-full h-full">
							<MeetPipS6P4MzViz canvasSize={300} />
						</TabsContent>

						<TabsContent value="color" className="w-full h-full">
							<MeetPipS8P3ColorViz />
						</TabsContent>

						<TabsContent value="motors" className="w-full h-full">
							<MeetPipS9P6EncoderViz />
						</TabsContent>
					</TabsContents>
				</Tabs>
			</div>
		</div>
	)
}

export default observer(SensorDataSection)

