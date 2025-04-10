"use client"
import Workbench from "../workbench/workbench"
import LightSection from "./light/light-section"
import DisplaySection from "./display/display-section"
import DrivingAndSoundsSection from "./driving-and-sounds/driving-and-sounds-section"

export default function TheGaragePage() {
	return (
		<div className="flex flex-row h-screen overflow-hidden relative w-full space-x-[45px] pl-[20px] pr-[45px] pt-[45px]">
			<div className="w-full lg:w-3/5 xl:w-3/4">
				<LightSection />
				<div className="h-0.5 bg-swan rounded-full"/>
				<DisplaySection />
				<div className="h-0.5 bg-swan rounded-full"/>
				<DrivingAndSoundsSection />
			</div>

			{/* Border separator as absolute element */}
			<div className="absolute lg:right-[43%] xl:right-[28%] h-full top-0 border-r-2 border-swan"/>

			<Workbench />
		</div>
	)
}
