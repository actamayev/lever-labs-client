"use client"
import LightSection from "./light/light-section"
import DisplaySection from "./display/display-section"
import WorkbenchLayout from "../layouts/workbench-layout"
import SoundsAndDemosSection from "./sounds-and-demos/sounds-and-demos-section"

export default function TheGaragePage(): React.ReactNode {
	return (
		<WorkbenchLayout
			extraParentClasses="flex flex-row overflow-hidden w-full"
			extraChildrenClasses="overflow-hidden"
		>
			<LightSection />
			<DisplaySection />
			<SoundsAndDemosSection />
		</WorkbenchLayout>
	)
}
