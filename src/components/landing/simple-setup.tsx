import { Power, Wifi, ThumbsUp } from "lucide-react"
import ShowIcon from "./show-icon"
import RightArrow from "../lab/welcome-page/right-arrow"
import { HoverIconEnlarge } from "../hover-icon-enlarge"
import LandingSectionHeaderText from "./landing-section-header-text"
import { landingBulletTextParagraph, landingBulletTextTitle, landingParagraph } from "../../utils/text-styles"

export default function SimpleSetup() {
	return (
		<div className="w-full">
			{/* Switch to horizontal layout at xl (1280px) instead of lg (1024px) to prevent overlap */}
			<div className="flex flex-col xl:flex-row justify-between w-full gap-8 xl:gap-16">
				{/* Content ordering based on screen size */}
				{/* Text Content - First on mobile/tablet/small desktop, Second on extra large screens */}
				<div className="flex flex-col w-full xl:w-1/2 xl:justify-center order-1 xl:order-2">
					<LandingSectionHeaderText text="simple setup"/>
					{/* ShowIconed points */}
					<div className="mt-4 sm:mt-8 space-y-3 sm:space-y-4">
						<div className="flex items-start">
							<ShowIcon icon={Power} />
							<div className="ml-3 sm:ml-4">
								<h3 className={landingBulletTextTitle()}>Just power on and go</h3>
								<p className={landingBulletTextParagraph()}>
									Pip works right out the box - no assembly required!
								</p>
							</div>
						</div>

						<div className="flex items-start">
							<ShowIcon icon={Wifi} />
							<div className="ml-3 sm:ml-4">
								<h3 className={landingBulletTextTitle()}>Quick connection</h3>
								<p className={landingBulletTextParagraph()}>
									Connect to Wi-Fi and Pip becomes your Lab partner, running demos and your coding solutions in real-time!
								</p>
							</div>
						</div>

						<div className="flex items-start">
							<ShowIcon icon={ThumbsUp} />
							<div className="ml-3 sm:ml-4">
								<h3 className={landingBulletTextTitle()}>Easy commands</h3>
								<p className={landingBulletTextParagraph()}>
									Control Pip with simple instructions that make sense
								</p>
							</div>
						</div>

						<p className={landingParagraph()}>
							Everything is super simple, so you can focus on the fun parts.
						</p>
					</div>
				</div>

				{/* Image Content - Second on mobile/tablet/small desktop, First on extra large screens */}
				<div className="w-full xl:w-1/2 flex mt-8 xl:mt-0 justify-center items-center order-2 xl:order-1">
					<div className="flex flex-row items-center justify-between relative w-full max-w-md mx-auto">
						<div className="flex flex-row items-center">
							<HoverIconEnlarge
								icon={Power}
								backgroundSize="size-12 sm:size-16 lg:size-20 xl:size-24"
								iconSize="size-5 sm:size-6 lg:size-8 xl:size-10"
							/>
						</div>

						<div className="mx-1 sm:mx-2 lg:mx-3 xl:mx-4">
							<RightArrow iconSize="size-5 sm:size-6 lg:size-8 xl:size-10"/>
						</div>

						<div className="flex flex-row items-center">
							<HoverIconEnlarge
								icon={Wifi}
								bgColor="bg-purple-100"
								iconColor="text-purple-600"
								darkBgColor="dark:bg-purple-900/50"
								darkIconColor="dark:text-purple-400"
								backgroundSize="size-12 sm:size-16 lg:size-20 xl:size-24"
								iconSize="size-5 sm:size-6 lg:size-8 xl:size-10"
							/>
						</div>

						<div className="mx-1 sm:mx-2 lg:mx-3 xl:mx-4">
							<RightArrow iconSize="size-5 sm:size-6 lg:size-8 xl:size-10"/>
						</div>

						<div className="flex flex-row items-center">
							<HoverIconEnlarge
								icon={ThumbsUp}
								bgColor="bg-green-100"
								iconColor="text-green-600"
								darkBgColor="dark:bg-green-900/50"
								darkIconColor="dark:text-green-400"
								backgroundSize="size-12 sm:size-16 lg:size-20 xl:size-24"
								iconSize="size-5 sm:size-6 lg:size-8 xl:size-10"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
