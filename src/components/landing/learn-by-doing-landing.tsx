import { CustomMotor } from "../icons/custom-motor"
import { CustomMaze } from "../icons/custom-maze"
import { CustomLightbulb } from "../icons/custom-lightbulb"

export default function LearnByDoing() {
	return (
		<div className="w-full mt-36">
			{/* Section layout */}
			<div className="flex flex-col md:flex-row justify-between w-full gap-16">
				{/* Left side with text and table */}
				<div className="flex flex-col w-full md:w-1/2">
					<h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-pipTheme">
						learn by doing.
					</h2>

					{/* Single unified comparison card */}
					<div className="mt-8">
						<div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
							{/* Header row */}
							<div className="grid grid-cols-2 bg-pipTheme bg-opacity-10">
								<div className="p-4 font-semibold text-lg text-center">In the lab</div>
								<div className="p-4 font-semibold text-lg text-center border-l border-gray-200
								dark:border-gray-700">With Pip</div>
							</div>

							{/* Motors & Movement row */}
							<div className="grid grid-cols-[min-content_1fr_1fr] divide-x divide-gray-200
							dark:divide-gray-700 border-b border-gray-200 dark:border-gray-700">
								<div className="px-2 flex items-center justify-center">
									<CustomMotor />
								</div>
								<div className="p-4">
									<p className="text-base">Read about how motors work</p>
								</div>
								<div className="p-4">
									<p className="text-base">Take Pip on a joy-ride around your home</p>
								</div>
							</div>

							{/* Algorithms & Navigation row */}
							<div className="grid grid-cols-[min-content_1fr_1fr] divide-x divide-gray-200
							dark:divide-gray-700 border-b border-gray-200 dark:border-gray-700">
								<div className="px-2 flex items-center justify-center">
									<CustomMaze />
								</div>
								<div className="p-4">
									<p className="text-base">Learn about maze-solving algorithms</p>
								</div>
								<div className="p-4">
									<p className="text-base">Watch Pip navigate a maze you created</p>
								</div>
							</div>

							{/* LEDs & Lighting row */}
							<div className="grid grid-cols-[min-content_1fr_1fr] divide-x divide-gray-200
							dark:divide-gray-700 border-b border-gray-200 dark:border-gray-700">
								<div className="px-2 flex items-center justify-center">
									<CustomLightbulb />
								</div>
								<div className="p-4">
									<p className="text-base">Study how LEDs function</p>
								</div>
								<div className="p-4">
									<p className="text-base">Write a program for Pip to put on a dazzling light show</p>
								</div>
							</div>
						</div>
					</div>

					<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-8">
						We bring Pip into the learning at every step to create an experience you won't
						find anywhere else. The Lab teaches you cool concepts, and Pip shows you how they work in real life.
					</p>
				</div>

				{/* Right side with image */}
				<div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
					<div className="relative">
						<img
							src="/api/placeholder/480/480"
							alt="Pip learning in action"
							className="max-w-full h-auto rounded-lg shadow-lg"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
