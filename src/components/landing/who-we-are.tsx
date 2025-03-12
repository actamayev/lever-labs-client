import BlueDot from "./blue-dot"
import { LandingCTAButton } from "../buttons/tactile-buttons"
import LandingSectionHeaderText from "./landing-section-header-text"
import LandingSectionSplit from "./landing-section-split"
import { TactileButton } from "../shadcn/ui/tactile-button"
import { cn } from "../../lib/shadcn/utils"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"
import { observer } from "mobx-react"

function WhoWeAre() {
	const defaultSiteTheme = useDefaultSiteTheme()

	return (
		<LandingSectionSplit
			leftContent={
				<>
					<div className="relative">
						<BlueDot />
					</div>
				</>
			}
			rightContent={
				<div className="flex flex-col w-full">
					<LandingSectionHeaderText text="by builders," />
					<LandingSectionHeaderText text="for builders" />
					<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-8">
						As engineers who grew up tinkering, we've experienced firsthand how traditional robotics
						education can be frustrating and limiting.
					</p>

					<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-4">
						Pip is the product we wish we had—
						<span className="font-semibold">no assembly required, no ceiling on what you can learn!</span>
					</p>

					<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-4">
						Behind Pip is our small and passionate team, committed to revolutionizing how
						robotics is taught and learned.
					</p>

					<div className="flex items-center justify-center my-8">
						<a
							href="https://help.bluedotrobots.com/bdr"
							aria-label="LinkedIn"
							className="text-gray-800 hover:text-gray-950 dark:text-gray-200
							dark:hover:text-white transition-all duration-300"
							target="_blank"
							rel="noopener noreferrer"
						>
							<TactileButton
								className={cn("px-8 !py-5 text-2xl transition-none rounded-2xl border-2 w-full h-12",
									"bg-green-500 border-none text-white hover:bg-green-400",
									"dark:bg-green-900 dark:border-green-600 dark:text-green-200 dark:hover:bg-green-950")}
								shadowColor={defaultSiteTheme === "light" ? "rgb(34, 160, 94)" : "rgb(22 163 74)"}
								shadowHeight={2}
							>
								About Blue Dot
							</TactileButton>
						</a>
						{/* <LandingCTAButton navigateTo="/about">
							About Blue Dot
						</LandingCTAButton> */}
					</div>
				</div>
			}
		/>
	)
}

export default observer(WhoWeAre)
