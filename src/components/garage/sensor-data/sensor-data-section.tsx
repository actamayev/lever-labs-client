"use client"

import { observer } from "mobx-react"
import { Gauge, Radar, ScanLine, Palette, GaugeCircle } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent, TabsContents } from "../../ui/shadcn-io/tabs"
import { WORKBENCH_ROUNDING_RADIUS } from "../../../utils/constants/constants"

function SensorDataSection(): React.ReactNode {
	return (
		<div
			className="h-2/3 overflow-hidden border-b border-r border-t border-swan"
			style={{
				borderTopRightRadius: WORKBENCH_ROUNDING_RADIUS,
				borderBottomRightRadius: WORKBENCH_ROUNDING_RADIUS
			}}
		>
			<div className="h-full flex flex-col p-4">
				<Tabs defaultValue="imu" className="w-full h-full flex flex-col">
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

					<TabsContents className="flex-1 overflow-auto">
						<TabsContent value="imu" className="w-full h-full">
							<div className="h-full flex items-center justify-center">
								<div className="text-lg">IMU Sensor Data</div>
							</div>
						</TabsContent>

						<TabsContent value="side-distance" className="w-full h-full">
							<div className="h-full flex items-center justify-center">
								<div className="text-lg">Side Distance Sensors Data</div>
							</div>
						</TabsContent>

						<TabsContent value="front-distance" className="w-full h-full">
							<div className="h-full flex items-center justify-center">
								<div className="text-lg">Front Distance Sensor Data</div>
							</div>
						</TabsContent>

						<TabsContent value="color" className="w-full h-full">
							<div className="h-full flex items-center justify-center">
								<div className="text-lg">Color Sensor Data</div>
							</div>
						</TabsContent>

						<TabsContent value="motors" className="w-full h-full">
							<div className="h-full flex items-center justify-center">
								<div className="text-lg">Motors Data</div>
							</div>
						</TabsContent>
					</TabsContents>
				</Tabs>
			</div>
		</div>
	)
}

export default observer(SensorDataSection)

