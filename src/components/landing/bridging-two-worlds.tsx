import { LucideIcon } from "lucide-react"
import { CustomCheck } from "../icons/custom-check"
import LandingSectionHeaderText from "./landing-section-header-text"

// eslint-disable-next-line @typescript-eslint/naming-convention
function ShowCheckIcon({ icon: Icon} : { icon: LucideIcon }) {
	return (
		<div className="flex-shrink-0">
			<div className="bg-green-500 dark:bg-green-700 w-6 h-6 rounded-full flex items-center justify-center text-white">
				<Icon size={80}/>
			</div>
		</div>
	)
}

export default function BridgingTwoWorlds() {
	return (
		<div className="w-full">
			{/* Section layout */}
			<div className="flex flex-col md:flex-row justify-between w-full gap-16">
				{/* Left side with text */}
				<div className="flex flex-col w-full md:w-1/2">
					<LandingSectionHeaderText text="bridging two worlds" />
					<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-8">
						Robotics is all about bringing together the digital and physical worlds, and we help you explore both!
						With Pip and the Lab, your code jumps off the screen and into real life.
					</p>
				</div>

				{/* Right side with checkmarks */}
				<div className="w-full md:w-1/2 flex flex-col mt-6 md:mt-0">
					<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mb-6">
						As robots become a bigger part of our everyday world, Pip gives you hands-on experience with:
					</p>

					{/* Checkmark points */}
					<div className="space-y-4">
						<div className="flex items-start">
							<ShowCheckIcon icon={CustomCheck} />
							<p className="ml-3 text-xl md:text-base leading-relaxed text-lightLandingPageText">
								Engineering mindset and critical thinking
							</p>
						</div>

						<div className="flex items-start">
							<ShowCheckIcon icon={CustomCheck} />
							<p className="ml-3 text-xl md:text-base leading-relaxed text-lightLandingPageText">
								Creative problem-solving through code
							</p>
						</div>

						<div className="flex items-start">
							<ShowCheckIcon icon={CustomCheck} />
							<p className="ml-3 text-xl md:text-base leading-relaxed text-lightLandingPageText">
								Data-driven decision making
							</p>
						</div>

						<div className="flex items-start">
							<ShowCheckIcon icon={CustomCheck} />
							<p className="ml-3 text-xl md:text-base leading-relaxed text-lightLandingPageText">
								STEM literacy for the digital age
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
