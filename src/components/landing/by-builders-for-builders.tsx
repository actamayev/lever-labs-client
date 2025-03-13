import BlueDot from "./blue-dot"
import { cn } from "../../lib/shadcn/utils"
import LandingSectionSplit from "./landing-section-split"
import { landingParagraph } from "../../utils/text-styles"
import LandingSectionHeaderText from "./landing-section-header-text"
import { LandingCTAButton } from "../buttons/tactile-buttons"

export default function ByBuildersForBuilders() {
	return (
		<LandingSectionSplit
			imagePosition="left"
			leftContent={
				<div className="relative mb-12">
					<BlueDot />
				</div>
			}
			rightContent={
				<div className="flex flex-col w-full">
					<LandingSectionHeaderText text="by builders," />
					<LandingSectionHeaderText text="for builders" />
					<p className={landingParagraph("mt-4 sm:mt-5")}>
						As engineers who grew up tinkering, we've experienced firsthand how traditional robotics
						education can be frustrating and limiting.
					</p>

					<p className={landingParagraph("mt-4 sm:mt-5")}>
						Pip is the product we wish we had—
						<span className="font-semibold">no assembly required, no ceiling on what you can learn!</span>
					</p>

					<p className={landingParagraph("mt-4 sm:mt-5")}>
						Behind Pip is our small and passionate team, committed to revolutionizing how
						robotics is taught and learned.
					</p>

					<div className="flex items-center justify-center my-6 sm:my-8">
						<LandingCTAButton
							className={cn("px-4 sm:px-8 !py-4 sm:!py-5 text-lg sm:text-2xl transition-none",
								"rounded-xl sm:rounded-2xl border-2 w-full h-10 sm:h-12",
								"bg-green-500 border-none text-white hover:bg-green-400",
								"dark:bg-green-900 dark:border-green-600 dark:text-green-200 dark:hover:bg-green-950")}
							shadowHeight={2}
							navigateTo="/mission"
						>
							About Blue Dot
						</LandingCTAButton>
					</div>
				</div>
			}
		/>
	)
}
