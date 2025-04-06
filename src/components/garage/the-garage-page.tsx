"use client"
import { Speaker } from "lucide-react"
import Workbench from "../workbench/workbench"
import { CustomWheel } from "../icons/custom-wheel"
import { CustomLightbulb } from "../icons/custom-lightbulb"
import ColorPicker from "./color-picker"
import LightDotsSelector from "./light-dots-selector"
import LightAnimationsList from "./light-animations-list"

export default function TheGaragePage() {
	return (
		<div className="flex flex-row h-screen overflow-hidden relative w-full space-x-12 px-10 pt-12">
			{/* Left section - 2/3 width */}
			<div className="w-full lg:w-3/5 xl:w-[61.8%] overflow-hidden">
				{/* First row - half height */}
				<div className="h-1/2 flex flex-row overflow-hidden">
					{/* Lights section */}
					<div className="w-1/2 flex flex-col items-center p-4">
						<div className="flex flex-row space-x-2 items-center mb-4">
							<CustomLightbulb />
							<h2 className="text-xl font-bold text-center">Lights</h2>
						</div>

						{/* Color selection grid - 2x2 layout */}
						<div className="w-full grid grid-cols-2 gap-4 mb-4">
							{/* Color Wheel */}
							<div className="flex items-center justify-center">
								<ColorPicker />
							</div>

							{/* Selectable Dots Square */}
							<div className="flex items-center justify-center">
								<LightDotsSelector />
							</div>
						</div>

						{/* Light Animations List */}
						<div className="w-full">
							<LightAnimationsList />
						</div>
					</div>

					{/* Vertical separator */}
					<div className="w-0.5 bg-swan rounded-full"></div>

					{/* Speaker section */}
					<div className="w-1/2 flex flex-col items-center p-4">
						<div className="flex flex-row space-x-2 items-center">
							<Speaker />
							<h2 className="text-xl font-bold text-center">Speaker</h2>
						</div>
						{/* Speaker content will go here */}
					</div>
				</div>

				{/* Horizontal separator */}
				<div className="h-0.5 bg-swan"></div>

				{/* Second row - half height */}
				<div className="h-1/2 p-4 flex flex-col items-center overflow-hidden">
					<div className="w-1/2 flex flex-col items-center p-4">
						<div className="flex flex-row space-x-2 items-center">
							<CustomWheel />
							<h2 className="text-xl font-bold text-center">Driving</h2>
						</div>
						{/* Driving content will go here */}
					</div>
				</div>
			</div>

			{/* Border separator as absolute element */}
			<div className="absolute right-[39%] xl:right-[38.2%] lg:right-[40%] h-full top-0 border-r-2 border-swan"></div>

			<Workbench />
		</div>
	)
}
