import BlueDot from "./blue-dot"
import { LandingCTAButton } from "../buttons/tactile-buttons"
import LandingSectionHeaderText from "./landing-section-header-text"
import LandingSectionSplit from "./landing-section-split"

export default function WhoWeAre() {
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
						<LandingCTAButton navigateTo="/login">
							About Blue Dot
						</LandingCTAButton>
					</div>
				</div>
			}
		/>
	)
}
