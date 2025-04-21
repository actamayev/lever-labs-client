"use client"
import LightSection from "./light/light-section"
import DisplaySection from "./display/display-section"
import WorkbenchLayout from "../layouts/workbench-layout"
import SoundsAndDemosSection from "./driving-and-sounds/sounds-and-demos-section"

export default function TheGaragePage() {
	return (
		<WorkbenchLayout>
			<LightSection />
			<DisplaySection />
			<SoundsAndDemosSection />
		</WorkbenchLayout>
	)
}
