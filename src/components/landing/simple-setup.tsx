import { Power, Wifi, ThumbsUp } from "lucide-react"
import ShowIcon from "./show-icon"
import LandingSectionHeaderText from "./landing-section-header-text"

export default function SimpleSetup() {
	return (
		<div className="w-full">
			{/* Section in Duolingo style */}
			<div className="flex flex-col md:flex-row justify-between w-full gap-16">
				{/* Right side with image - moved to first position like in TheLab */}
				<div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
					{/* <div className="relative">
						<img
							src="/simple_yet_powerful.png"
							alt="Simple Yet Powerful Pip"
							className="max-w-full h-auto"
						/>
					</div> */}
				</div>

				{/* Left side with text */}
				<div className="flex flex-col w-full md:w-1/2">
					<LandingSectionHeaderText text="simple setup"/>
					{/* ShowIconed points */}
					<div className="mt-8 mb-4 space-y-4">
						{/* Point 1 */}
						<div className="flex">
							<ShowIcon icon={Power} />
							<div className="ml-4">
								<h3 className="text-xl font-semibold text-pipThemeText">Just power on and go</h3>
								<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-1">
									Pip works the moment you unbox it - no assembly required!
								</p>
							</div>
						</div>

						{/* Point 2 */}
						<div className="flex">
							<ShowIcon icon={Wifi} />
							<div className="ml-4">
								<h3 className="text-xl font-semibold text-pipThemeText">Quick connection</h3>
								<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-1">
									Connect to Wi-Fi and Pip becomes your Lab partner, running demos and your coding solutions in real-time!
								</p>
							</div>
						</div>

						{/* Point 3 */}
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
			</div>
		</div>
	)
}
