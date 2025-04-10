"use client"
import Workbench from "../workbench/workbench"
import LightSection from "./light/light-section"
import DisplaySection from "./display/display-section"
import DrivingAndSoundsSection from "./driving-and-sounds/driving-and-sounds-section"

export default function TheGaragePage() {
	return (
		<div className="flex flex-row h-screen overflow-y-auto relative w-full space-x-[45px] px-[45px] pt-[45px]">
			<div className="w-full lg:w-3/5 xl:w-3/4">
				<LightSection />
				<div className="h-0.5 bg-swan w-full"/>
				<DisplaySection />
				<div className="h-0.5 bg-swan"/>
				<DrivingAndSoundsSection />
			</div>

			{/* Border separator as absolute element */}
			{/* <div className="absolute right-[39%] xl:right-1/4 lg:right-2/5 h-full top-0 border-r-2 border-swan"/> */}

			<Workbench />
		</div>
	)
}
