import { CustomMotor } from "../icons/custom-motor"
import { CustomMaze } from "../icons/custom-maze"
import { CustomLightbulb } from "../icons/custom-lightbulb"
import LandingSectionHeaderText from "./landing-section-header-text"

export default function LearnByDoing() {
	return (
		<div className="w-full">
			{/* Section header */}
			<LandingSectionHeaderText text="learn by doing" />

			{/* Single unified comparison card - full width */}
			<div className="mt-8">
				<div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
					{/* Header row - adjusted to match content row structure */}
					<div className="grid grid-cols-[min-content_1fr_1fr] bg-pipTheme bg-opacity-10">
						<div className="px-6"></div> {/* Empty cell for alignment with icon column */}
						<div className="p-4 font-semibold text-lg text-center">In the lab</div>
						<div className="p-4 font-semibold text-lg text-center border-l border-gray-200 dark:border-gray-700">With Pip</div>
					</div>

					{/* Motors & Movement row */}
					<div className="grid grid-cols-[min-content_1fr_1fr] divide-x divide-gray-200
					dark:divide-gray-700 border-b border-gray-200 dark:border-gray-700">
						<div className="px-2 flex items-center justify-center">
							<CustomMotor size={30}/>
						</div>
						<div className="p-4">
							<p className="text-base text-center">Read about how motors work</p>
						</div>
						<div className="p-4">
							<p className="text-base text-center">Take Pip on a joy-ride around your home</p>
						</div>
					</div>

					{/* Algorithms & Navigation row */}
					<div className="grid grid-cols-[min-content_1fr_1fr] divide-x divide-gray-200
					dark:divide-gray-700 border-b border-gray-200 dark:border-gray-700">
						<div className="px-2 flex items-center justify-center">
							<CustomMaze size={30}/>
						</div>
						<div className="p-4">
							<p className="text-base text-center">Learn about maze-solving algorithms</p>
						</div>
						<div className="p-4">
							<p className="text-base text-center">Watch Pip navigate a maze you created</p>
						</div>
					</div>

					{/* LEDs & Lighting row */}
					<div className="grid grid-cols-[min-content_1fr_1fr] divide-x divide-gray-200 dark:divide-gray-700">
						<div className="px-2 flex items-center justify-center">
							<CustomLightbulb size={30}/>
						</div>
						<div className="p-4">
							<p className="text-base text-center">Study how LEDs function</p>
						</div>
						<div className="p-4">
							<p className="text-base text-center">Write a program for Pip to put on a dazzling light show</p>
						</div>
					</div>
				</div>
			</div>

			<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-8">
				We bring Pip into the learning at every step to create an experience you won't
				find anywhere else. The Lab teaches you cool concepts, and Pip shows you how they work in real life.
			</p>
		</div>
	)
}
