import { Power, Wifi, ThumbsUp } from "lucide-react"
import ShowIcon from "./show-icon"
import RightArrow from "../lab/welcome-page/right-arrow"
import { HoverIconEnlarge } from "../hover-icon-enlarge"
import LandingSectionSplit from "./landing-section-split"
import LandingSectionHeaderText from "./landing-section-header-text"

export default function SimpleSetup() {
	// Use a custom component instead of LandingSectionSplit
	// to have more control over breakpoints
	return (
		<div className="w-full">
			<div className="flex flex-col lg:flex-row justify-between w-full gap-8 lg:gap-16">
				{/* Content ordering based on screen size */}
				{/* Text Content - First on mobile/tablet, Second on large screens */}
				<div className="flex flex-col w-full lg:w-1/2 lg:justify-center order-1 lg:order-2">
					<LandingSectionHeaderText text="simple setup"/>
					{/* ShowIconed points */}
					<div className="mt-4 sm:mt-8 space-y-3 sm:space-y-4">
						<div className="flex items-start">
							<ShowIcon icon={Power} />
							<div className="ml-3 sm:ml-4">
								<h3 className="text-lg sm:text-xl font-semibold text-pipThemeText">Just power on and go</h3>
								<p className="text-sm sm:text-base md:text-base leading-relaxed text-lightLandingPageText mt-1">
                  Pip works right out the box - no assembly required!
								</p>
							</div>
						</div>

						<div className="flex items-start">
							<ShowIcon icon={Wifi} />
							<div className="ml-3 sm:ml-4">
								<h3 className="text-lg sm:text-xl font-semibold text-pipThemeText">Quick connection</h3>
								<p className="text-sm sm:text-base md:text-base leading-relaxed text-lightLandingPageText mt-1">
                  Connect to Wi-Fi and Pip becomes your Lab partner, running demos and your coding solutions in real-time!
								</p>
							</div>
						</div>

						<div className="flex items-start">
							<ShowIcon icon={ThumbsUp} />
							<div className="ml-3 sm:ml-4">
								<h3 className="text-lg sm:text-xl font-semibold text-pipThemeText">Easy commands</h3>
								<p className="text-sm sm:text-base md:text-base leading-relaxed text-lightLandingPageText mt-1">
                  Control Pip with simple instructions that make sense
								</p>
							</div>
						</div>

						<p className="text-sm sm:text-base md:text-base leading-relaxed text-lightLandingPageText">
              Everything is super simple, so you can focus on the fun parts.
						</p>
					</div>
				</div>

				{/* Image Content - Second on mobile/tablet, First on large screens */}
				<div className="w-full lg:w-1/2 flex mt-8 lg:mt-0 justify-center items-center order-2 lg:order-1">
					<div className="flex flex-row items-center justify-between relative w-full max-w-md mx-auto">
						<div className="flex flex-row items-center">
							<HoverIconEnlarge
								icon={Power}
								backgroundSize="size-16 sm:size-20 md:size-24"
								iconSize="size-6 sm:size-8 md:size-10"
							/>
						</div>

						<div className="mx-2 sm:mx-3 md:mx-4">
							<RightArrow iconSize="size-6 sm:size-8 md:size-10"/>
						</div>

						<div className="flex flex-row items-center">
							<HoverIconEnlarge
								icon={Wifi}
								bgColor="bg-purple-100"
								iconColor="text-purple-600"
								darkBgColor="dark:bg-purple-900/50"
								darkIconColor="dark:text-purple-400"
								backgroundSize="size-16 sm:size-20 md:size-24"
								iconSize="size-6 sm:size-8 md:size-10"
							/>
						</div>

						<div className="mx-2 sm:mx-3 md:mx-4">
							<RightArrow iconSize="size-6 sm:size-8 md:size-10"/>
						</div>

						<div className="flex flex-row items-center">
							<HoverIconEnlarge
								icon={ThumbsUp}
								bgColor="bg-green-100"
								iconColor="text-green-600"
								darkBgColor="dark:bg-green-900/50"
								darkIconColor="dark:text-green-400"
								backgroundSize="size-16 sm:size-20 md:size-24"
								iconSize="size-6 sm:size-8 md:size-10"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
