import { Baby, Cog } from "lucide-react"
import ShowIcon from "./show-icon"
import { CustomSandbox } from "../icons/custom-sandbox"
import LandingSectionSplit from "./landing-section-split"
import LandingSectionHeaderText from "./landing-section-header-text"
import { landingBulletTextParagraph, landingBulletTextTitle, landingParagraph } from "../../utils/text-styles"

export default function AllAgesWelcome() {
	return (
		<LandingSectionSplit
			imagePosition="left"
			rightContent={
				<div>
					<LandingSectionHeaderText text="all ages welcome" />
					<p className={landingParagraph("mt-4 sm:mt-8")}>
						We've made Pip and the Lab accessible to everyone - whether you're just curious or already a robotics expert.
						No matter where you're starting from, we've got the perfect path for you!
					</p>
				</div>
			}
			leftContent={
				<div className="space-y-3 sm:space-y-4">
					<div className="flex items-start">
						<ShowIcon icon={Baby}/>
						<div className="ml-3 sm:ml-4">
							<h3 className={landingBulletTextTitle()}>Beginner friendly</h3>
							<p className={landingBulletTextParagraph()}>
								Drag colorful blocks into place to build your programs - no typing required!
							</p>
						</div>
					</div>

					<div className="flex items-start">
						<ShowIcon icon={Cog}/>
						<div className="ml-3 sm:ml-4">
							<h3 className={landingBulletTextTitle()}>Ready for more</h3>
							<p className={landingBulletTextParagraph()}>
								Switch to our simplified text code that makes controlling Pip's actuators
								and reading sensors super easy.
							</p>
						</div>
					</div>

					<div className="flex items-start">
						<ShowIcon icon={CustomSandbox}/>
						<div className="ml-3 sm:ml-4">
							<h3 className={landingBulletTextTitle()}>Explore freely</h3>
							<p className={landingBulletTextParagraph()}>
								Once you've mastered the Lab, head to the Sandbox where you can create anything you imagine -
								the only limit is your imagination.
							</p>
						</div>
					</div>
				</div>
			}
		/>
	)
}
