import { School } from "lucide-react"
import LandingSectionSplit from "./landing-section-split"
// import { LandingCTAButton } from "../buttons/tactile-buttons"
import LandingSectionHeaderText from "./landing-section-header-text"

export default function DesignedForClassroom() {
	return (
		<LandingSectionSplit
			imagePosition="right"
			leftContent={
				<>
					<LandingSectionHeaderText text="designed for" />
					<LandingSectionHeaderText text="the classroom" />

					<p className="text-base sm:text-lg md:text-base leading-relaxed text-lightLandingPageText mt-4 sm:mt-8">
						Create classes, assign challenges, and watch student progress from one simple dashboard.
						Students can use any Pip, and their work saves automatically to their account!
					</p>

					{/* <div className="pt-8 flex items-center justify-center">
						<LandingCTAButton navigateTo="/login">
							Get your classroom started
						</LandingCTAButton>
					</div> */}
				</>
			}
			rightContent={
				<div className="flex justify-center items-center">
					<School className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40" />
				</div>
			}
		/>
	)
}
