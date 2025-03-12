import LandingSectionHeaderText from "./landing-section-header-text"
import LandingSectionSplit from "./landing-section-split"

export default function LearnByDoing() {
	return (
		<LandingSectionSplit
			imagePosition="right"
			leftContent={
				<>
					<LandingSectionHeaderText text="learn by doing" />
					<p className="text-base sm:text-lg md:text-base leading-relaxed text-lightLandingPageText mt-4 sm:mt-8">
						We bring Pip into the learning at every step to create an experience you won't
						find anywhere else. The Lab teaches you cool concepts, and Pip shows you how they work in real life.
					</p>
				</>
			}
			rightContent={
				<div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md w-full">
					{/* Header row */}
					<div className="grid grid-cols-2 text-questionText">
						<div className="p-2 sm:p-4 font-semibold text-sm sm:text-lg md:text-xl text-center bg-pipTheme bg-opacity-10">
							In the lab
						</div>
						<div className="p-2 sm:p-4 font-semibold text-sm sm:text-lg md:text-xl text-center bg-pipTheme bg-opacity-10">
							With Pip
						</div>
					</div>

					{/* LEDs & Lighting row */}
					<div className="grid grid-cols-2 divide-x divide-gray-200
					dark:divide-gray-700 border-t border-gray-200 dark:border-gray-700 text-lightLandingPageText">
						<div className="p-2 sm:p-4 flex items-center justify-center">
							<p className="text-xs sm:text-sm md:text-base text-center">Study how LEDs function</p>
						</div>
						<div className="p-2 sm:p-4 flex items-center justify-center">
							<p className="text-xs sm:text-sm md:text-base text-center">
								Write a program for Pip to put on a thrilling light show
							</p>
						</div>
					</div>

					{/* Motors & Movement row */}
					<div className="grid grid-cols-2 divide-x divide-gray-200
					dark:divide-gray-700 border-t border-gray-200 dark:border-gray-700 text-lightLandingPageText">
						<div className="p-2 sm:p-4 flex items-center justify-center">
							<p className="text-xs sm:text-sm md:text-base text-center">Read about how motors work</p>
						</div>
						<div className="p-2 sm:p-4 flex items-center justify-center">
							<p className="text-xs sm:text-sm md:text-base text-center">Take Pip on a joy-ride around your home</p>
						</div>
					</div>

					{/* Algorithms & Navigation row */}
					<div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700
					border-t border-gray-200 dark:border-gray-700 text-lightLandingPageText">
						<div className="p-2 sm:p-4 flex items-center justify-center">
							<p className="text-xs sm:text-sm md:text-base text-center">Learn about maze-solving algorithms</p>
						</div>
						<div className="p-2 sm:p-4 flex items-center justify-center">
							<p className="text-xs sm:text-sm md:text-base text-center">Watch Pip navigate a maze you created</p>
						</div>
					</div>
				</div>
			}
		/>
	)
}
