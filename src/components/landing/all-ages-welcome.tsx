import { Baby, Cog } from "lucide-react"
import ShowIcon from "./show-icon"
import { CustomSandbox } from "../icons/custom-sandbox"
import LandingSectionSplit from "./landing-section-split"
import LandingSectionHeaderText from "./landing-section-header-text"

export default function AllAgesWelcome() {
	return (
		<>
			<LandingSectionSplit
				rightContent={
					<div>
						<LandingSectionHeaderText text="all ages welcome" />
						<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-8">
							We've made Pip and the Lab accessible to everyone - whether you're just curious or already a robotics expert.
							No matter where you're starting from, we've got the perfect path for you!
						</p>
					</div>
				}
				leftContent={
					<div className="space-y-4">
						<div className="flex">
							<ShowIcon icon={Baby}/>
							<div className="ml-4">
								<h3 className="text-xl font-semibold text-pipThemeText">Beginner friendly</h3>
								<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-1">
									Drag colorful blocks into place to build your programs - no typing required!
								</p>
							</div>
						</div>

						<div className="flex">
							<ShowIcon icon={Cog}/>
							<div className="ml-4">
								<h3 className="text-xl font-semibold text-pipThemeText">Ready for more</h3>
								<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-1">
									Switch to our simplified text code that makes controlling Pip's actuators
									and reading sensors super easy.
								</p>
							</div>
						</div>

						<div className="flex">
							<ShowIcon icon={CustomSandbox}/>
							<div className="ml-4">
								<h3 className="text-xl font-semibold text-pipThemeText">Explore freely</h3>
								<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-1">
									Once you've mastered the Lab, head to the Sandbox where you can create anything you imagine -
									the only limit is your imagination.
								</p>
							</div>
						</div>
					</div>
				}
			/>
		</>
	)
}
