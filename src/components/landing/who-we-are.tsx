import BlueDot from "./blue-dot"
import { LandingCTAButton } from "../buttons/tactile-buttons"
import LandingSectionHeaderText from "./landing-section-header-text"

export default function WhoWeAre() {
	return (
		<div className="w-full">
			{/* Section layout */}
			<div className="flex flex-col md:flex-row justify-between w-full gap-16">
				{/* Left side with BlueDot */}
				<div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
					<div className="relative">
						<BlueDot />
					</div>
				</div>

				{/* Right side with text */}
				<div className="flex flex-col w-full md:w-1/2">
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
			</div>
		</div>
	)
}
