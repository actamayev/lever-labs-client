import { Power, Wifi, ThumbsUp } from "lucide-react"
import ShowIcon from "./show-icon"
import LandingSectionHeaderText from "./landing-section-header-text"
import LandingSectionSplit from "./landing-section-split"
import { IconStep } from "../lab/welcome-page/welcome-page-icons"
import RightArrow from "../lab/welcome-page/right-arrow"

export default function SimpleSetup() {
	return (
		<LandingSectionSplit
			leftContent={
				<div className="flex flex-col md:flex-row items-center justify-between mb-6 relative">
					<IconStep
						icon={Power}
					/>

					<RightArrow iconSize="size-10"/>

					<IconStep
						icon={Wifi}
						bgColor="bg-purple-100"
						iconColor="text-purple-600"
						darkBgColor="dark:bg-purple-900/50"
						darkIconColor="dark:text-purple-400"
					/>

					<RightArrow iconSize="size-10"/>

					<IconStep
						icon={ThumbsUp}
						bgColor="bg-green-100"
						iconColor="text-green-600"
						darkBgColor="dark:bg-green-900/50"
						darkIconColor="dark:text-green-400"
					/>
				</div>
			}
			rightContent={
				<div className="flex flex-col">
					<LandingSectionHeaderText text="simple setup"/>
					{/* ShowIconed points */}
					<div className="mt-8 space-y-4">
						<div className="flex">
							<ShowIcon icon={Power} />
							<div className="ml-4">
								<h3 className="text-xl font-semibold text-pipThemeText">Just power on and go</h3>
								<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-1">
									Pip works the moment you unbox it - no assembly required!
								</p>
							</div>
						</div>

						<div className="flex">
							<ShowIcon icon={Wifi} />
							<div className="ml-4">
								<h3 className="text-xl font-semibold text-pipThemeText">Quick connection</h3>
								<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-1">
									Connect to Wi-Fi and Pip becomes your Lab partner, running demos and your coding solutions in real-time!
								</p>
							</div>
						</div>

						<div className="flex">
							<ShowIcon icon={ThumbsUp} />
							<div className="ml-4">
								<h3 className="text-xl font-semibold text-pipThemeText">Easy commands</h3>
								<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-1">
									Control Pip with simple instructions that make sense
								</p>
							</div>
						</div>

						<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText">
							Everything is super simple, so you can focus on the fun parts.
						</p>
					</div>
				</div>
			}
		/>
	)
}
