import LandingSectionHeaderText from "./landing-section-header-text"

export default function AllAgesWelcome() {
	return (
		<div className="w-full">
			<LandingSectionHeaderText text="all ages welcome" />

			<div className="flex flex-col md:flex-row justify-between w-full gap-16 mt-8">
				{/* Left side with text content */}
				<div className="flex flex-col w-full md:w-1/2">
					<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText">
						We've made Pip and the Lab accessible to everyone - whether you're just curious or already a robotics expert.
						No matter where you're starting from, we've got the perfect path for you!
					</p>

					<h3 className="text-2xl font-bold text-pipTheme mt-8 mb-4">Choose how you code</h3>

					<div className="space-y-6">
						{/* Beginner friendly option */}
						<div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md">
							<h4 className="font-bold text-lg text-pipTheme mb-2">Beginner friendly</h4>
							<p className="text-base text-lightLandingPageText">
								Drag colorful blocks into place to build your programs - no typing required!
							</p>
						</div>

						{/* Ready for more option */}
						<div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md">
							<h4 className="font-bold text-lg text-pipTheme mb-2">Ready for more</h4>
							<p className="text-base text-lightLandingPageText">
								Switch to our simplified text code that makes controlling Pip's actuators and reading sensors super easy.
							</p>
						</div>

						{/* Explore freely option */}
						<div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md">
							<h4 className="font-bold text-lg text-pipTheme mb-2">Explore freely</h4>
							<p className="text-base text-lightLandingPageText">
								Once you've mastered the challenges, head to the Sandbox where you can create anything you imagine -
								the only limit is your imagination.
							</p>
						</div>
					</div>
				</div>

				{/* Right side with three images */}
				<div className="w-full md:w-1/2 flex flex-col justify-center space-y-4 mt-8 md:mt-0">
					{/* Drag-and-drop code image */}
					<div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
						<div className="bg-pipTheme bg-opacity-10 p-2 text-center font-medium">
							Drag-and-drop Coding
						</div>
						<div className="p-2">
							<img
								src="/api/placeholder/480/200"
								alt="Drag-and-drop code interface"
								className="w-full h-auto rounded"
							/>
						</div>
					</div>

					{/* Guided text coding image */}
					<div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
						<div className="bg-pipTheme bg-opacity-10 p-2 text-center font-medium">
							Guided Text Coding
						</div>
						<div className="p-2">
							<img
								src="/api/placeholder/480/200"
								alt="Guided text coding interface"
								className="w-full h-auto rounded"
							/>
						</div>
					</div>

					{/* Sandbox image */}
					<div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
						<div className="bg-pipTheme bg-opacity-10 p-2 text-center font-medium">
							Sandbox Environment
						</div>
						<div className="p-2">
							<img
								src="/api/placeholder/480/200"
								alt="Sandbox interface"
								className="w-full h-auto rounded"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
