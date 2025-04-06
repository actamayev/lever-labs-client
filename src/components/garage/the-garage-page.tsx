"use client"
import { Speaker } from "lucide-react"
import Workbench from "../workbench/workbench"
import { CustomWheel } from "../icons/custom-wheel"
import { CustomLightbulb } from "../icons/custom-lightbulb"

export default function TheGaragePage() {
	return (
		<div className="flex flex-row h-screen overflow-y-auto relative w-full space-x-12 px-10 pt-12">
			{/* Left section - 2/3 width */}
			<div className="w-full lg:w-3/5 xl:w-[61.8%]">
				{/* First row - half height */}
				<div className="h-1/2 flex flex-row">
					{/* Lights section */}
					<div className="w-1/2 flex flex-col items-center p-4">
						<div className="flex flex-row space-x-2 items-center">
							<CustomLightbulb />
							<h2 className="text-xl font-bold text-center">Lights</h2>
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
				<div className="h-1/2 p-4 flex flex-col items-center">
					<div className="w-1/2 flex flex-col items-center p-4">
						<div className="flex flex-row space-x-2 items-center">
							<CustomWheel />
							<h2 className="text-xl font-bold text-center">Driving</h2>
						</div>
						{/* Speaker content will go here */}
					</div>
				</div>
			</div>

			{/* Border separator between main sections */}
			<div className="border-r-2 border-swan"></div>

			<Workbench />
		</div>
	)
}
