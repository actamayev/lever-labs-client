import { Power, Wifi, ThumbsUp } from "lucide-react"
import ShowIcon from "./show-icon"
import LandingSectionHeaderText from "./landing-section-header-text"
import LandingSectionSplit from "./landing-section-split"

export default function SimpleSetup() {
	return (
		<LandingSectionSplit
			leftContent={
				<>
					{/* <div className="relative">
						<img
							src="/simple_yet_powerful.png"
							alt="Simple Yet Powerful Pip"
							className="max-w-full h-auto"
						/>
					</div> */}
				</>
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
