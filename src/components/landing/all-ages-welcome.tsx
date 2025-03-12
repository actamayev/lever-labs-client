import LandingSectionSplit from "./landing-section-split"
import LandingSectionHeaderText from "./landing-section-header-text"

export default function AllAgesWelcome() {
	return (
		<>
			<LandingSectionSplit
				leftContent={
					<>
						<LandingSectionHeaderText text="all ages welcome" />
						<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-8">
							We've made Pip and the Lab accessible to everyone - whether you're just curious or already a robotics expert.
							No matter where you're starting from, we've got the perfect path for you!
						</p>
					</>
				}
				rightContent={
					<div className="space-y-6">
						{/* Beginner friendly option */}
						<div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md">
							<h4 className="font-bold text-lg text-pipThemeText mb-2">Beginner friendly</h4>
							<p className="text-base text-lightLandingPageText">
								Drag colorful blocks into place to build your programs - no typing required!
							</p>
						</div>

						{/* Ready for more option */}
						<div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md">
							<h4 className="font-bold text-lg text-pipThemeText mb-2">Ready for more</h4>
							<p className="text-base text-lightLandingPageText">
								Switch to our simplified text code that makes controlling Pip's actuators and reading sensors super easy.
							</p>
						</div>

						{/* Explore freely option */}
						<div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md">
							<h4 className="font-bold text-lg text-pipThemeText mb-2">Explore freely</h4>
							<p className="text-base text-lightLandingPageText">
								Once you've mastered the challenges, head to the Sandbox where you can create anything you imagine -
								the only limit is your imagination.
							</p>
						</div>
					</div>
				}
			/>
		</>
	)
}
