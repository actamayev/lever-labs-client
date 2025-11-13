"use client"
import { observer } from "mobx-react"
import LightSection from "./light/light-section"
import DisplaySection from "./display/display-section"
import SensorDataSection from "./sensor-data/sensor-data-section"
import WorkbenchLayout from "../layouts/workbench-layout"
import TonesAndDemosSection from "./tones-and-demos/tones-and-demos-section"
import garageClass from "../../classes/garage-class"

function TheGaragePage(): React.ReactNode {
	return (
		<WorkbenchLayout
			extraParentClasses="flex flex-row overflow-hidden w-full"
			extraChildrenClasses="overflow-hidden"
		>
			{garageClass.isSensorDataOpen ? (
				<SensorDataSection />
			) : (
				<>
					<LightSection />
					<DisplaySection />
				</>
			)}
			<TonesAndDemosSection />
		</WorkbenchLayout>
	)
}

export default observer(TheGaragePage)
