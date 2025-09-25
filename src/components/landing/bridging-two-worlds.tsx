"use client"

import { LucideIcon } from "lucide-react"
import { CustomCheck } from "../../icons/custom-check"
import LandingSectionSplit from "./landing-section-split"
import { landingBulletTextParagraph, landingParagraph } from "../../utils/text-styles"
import LandingSectionHeaderText from "./landing-section-header-text"

// eslint-disable-next-line @typescript-eslint/naming-convention
function ShowCheckIcon({ icon: Icon} : { icon: LucideIcon }): React.ReactNode {
	return (
		<div className="flex-shrink-0">
			<div className="bg-green-500 dark:bg-green-700 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white">
				<Icon size={12} className="w-3 h-3 sm:w-4 sm:h-4" />
			</div>
		</div>
	)
}

export default function BridgingTwoWorlds(): React.ReactNode {
	return (
		<LandingSectionSplit
			imagePosition="right"
			leftContent={
				<>
					<LandingSectionHeaderText text="bridging two worlds" />
					<p className={landingParagraph("mt-4 sm:mt-8")}>
						Robotics is all about bringing the physical and digital worlds together, and we help you explore both!
						With Pip and the Career Quest, your code jumps off the screen and into real life.
					</p>
				</>
			}
			rightContent={
				<div>
					<p className={landingParagraph("mb-3 sm:mb-6")}>
						As robots become a bigger part of our everyday world, Pip gives you hands-on experience with:
					</p>

					{/* Checkmark points */}
					<div className="space-y-2 sm:space-y-4">
						<div className="flex items-center">
							<ShowCheckIcon icon={CustomCheck} />
							<p className={landingBulletTextParagraph("ml-2 sm:ml-3")}>
								Engineering mindset and critical thinking
							</p>
						</div>

						<div className="flex items-center">
							<ShowCheckIcon icon={CustomCheck} />
							<p className={landingBulletTextParagraph("ml-2 sm:ml-3")}>
								Creative problem-solving through code
							</p>
						</div>

						<div className="flex items-center">
							<ShowCheckIcon icon={CustomCheck} />
							<p className={landingBulletTextParagraph("ml-2 sm:ml-3")}>
								Data-driven decision making
							</p>
						</div>

						<div className="flex items-center">
							<ShowCheckIcon icon={CustomCheck} />
							<p className={landingBulletTextParagraph("ml-2 sm:ml-3")}>
								STEM literacy for the digital age
							</p>
						</div>
					</div>
				</div>
			}
		/>
	)
}
