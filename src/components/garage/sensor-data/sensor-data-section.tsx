"use client"

import { observer } from "mobx-react"
import { Gauge, Radar, ScanLine, Palette } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "../../ui/shadcn-io/tabs"
import { WORKBENCH_ROUNDING_RADIUS } from "../../../utils/constants/constants"
import garageClass from "../../../classes/garage-class"
import MeetPipS5P4ImuViz from "../../career-quest/cq-right-components/meet-pip/meet-pip-s5-p4-imu-viz"
import MeetPipS6P4MzViz from "../../career-quest/cq-right-components/meet-pip/meet-pip-s6-p4-mz-viz"
import MeetPipS6P6TofsViz from "../../career-quest/cq-right-components/meet-pip/meet-pip-s6-p6-tofs-viz"
import MeetPipS8P3ColorViz from "../../career-quest/cq-right-components/meet-pip/meet-pip-s8-p3-color-viz"
import MeetPipS9P6EncoderViz from "../../career-quest/cq-right-components/meet-pip/meet-pip-s9-p6-encoder-viz"
import { CustomWheel } from "../../../icons/custom-wheel"

function SensorDataSection(): React.ReactNode {

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
							<CustomWheel className="h-4 w-4" />
							Motors
						</TabsTrigger>
					</TabsList>

					<div className="flex-1 overflow-auto">
						{garageClass.currentSensorDataTab === "imu" && (
							<div className="w-full h-full">
								<MeetPipS5P4ImuViz chartHeight={190} yAxisWidth={50} />
							</div>
						)}

						{garageClass.currentSensorDataTab === "side-distance" && (
							<div className="w-full h-full">
								<MeetPipS6P6TofsViz />
							</div>
						)}

						{garageClass.currentSensorDataTab === "front-distance" && (
							<div className="w-full h-full">
								<MeetPipS6P4MzViz canvasSize={300} />
							</div>
						)}

						{garageClass.currentSensorDataTab === "color" && (
							<div className="w-full h-full">
								<MeetPipS8P3ColorViz />
							</div>
						)}

						{garageClass.currentSensorDataTab === "motors" && (
							<div className="w-full h-full">
								<MeetPipS9P6EncoderViz />
							</div>
						)}
					</div>
				</Tabs>
			</div>
		</div>
	)
}

export default observer(SensorDataSection)

