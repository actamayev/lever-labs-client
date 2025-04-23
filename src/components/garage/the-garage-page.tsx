"use client"
import { useEffect } from "react"
import LightSection from "./light/light-section"
import DisplaySection from "./display/display-section"
import WorkbenchLayout from "../layouts/workbench-layout"
import SoundsAndDemosSection from "./driving-and-sounds/sounds-and-demos-section"

export default function TheGaragePage() {
	useEffect(() => {
		// Save the original styles
		const originalStyle = window.getComputedStyle(document.body).overflow

		// Disable scrolling on body
		document.body.style.overflow = "hidden"

		// Cleanup function to restore original styling when component unmounts
		return () => {
			document.body.style.overflow = originalStyle
		}
	}, [])

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
