import { School } from "lucide-react"
import { LandingCTAButton } from "../buttons/tactile-buttons"
import LandingSectionHeaderText from "./landing-section-header-text"

export default function DesignedForClassroom() {
	return (
		<div className="w-full">
			<LandingSectionHeaderText text="designed for" />
			<LandingSectionHeaderText text="the classroom" />

			<div className="flex flex-col md:flex-row justify-between w-full gap-16 mt-8">
				{/* Left side with text content */}
				<div className="flex flex-col w-full md:w-1/2">
					<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText">
						Create classes, assign challenges, and watch student progress from one simple dashboard.
						Students can use any Pip, and their work saves automatically to their account!
					</p>

					{/* <div className="pt-8 flex items-center justify-center">
						<LandingCTAButton navigateTo="/login">
							Get your classroom started
						</LandingCTAButton>
					</div> */}
				</div>

				{/* Right side with school SVG */}
				<div className="w-full md:w-1/2 flex justify-center items-center">
					<School size={130}/>
				</div>
			</div>
		</div>
	)
}
