"use client"

import Image from "next/image"
import { Target, Lightbulb, Code2 } from "lucide-react"
import ShowIcon from "./show-icon"
import LandingSectionSplit from "./landing-section-split"
import { LandingCTAButton } from "../buttons/tactile-buttons"
import LandingSectionHeaderText from "./landing-section-header-text"
import { landingBulletTextParagraph, landingBulletTextTitle, landingParagraph } from "../../utils/text-styles"

export default function CareerQuestLanding() {
	return (
		<LandingSectionSplit
			imagePosition="left"
			leftContent={
				<div className="relative w-full sm:w-4/5 md:w-[500px] h-[300px] sm:h-[350px] md:h-[400px]">
					<Image
						src="/pip_top_right.png"
						alt="Pip"
						className="rounded-lg"
						fill
						sizes="(max-width: 768px) 80vw, 500px"
						style={{ objectFit: "contain" }}
						priority
					/>
				</div>
			}
			rightContent={
				<div className="flex flex-col w-full">
					<LandingSectionHeaderText text="career quest" />
					<p className={landingParagraph("mt-4 sm:mt-8")}>
						Pip can't decide what kind of robot he wants to be — and that's where you come in!
						Career Quest is all about exploration and discovery.
						As you guide Pip through bite-sized challenges, you'll both transform from
						<span className="font-semibold"> curious beginners to career experts:</span>
					</p>

					{/* Career Quest points */}
					<div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
						<div className="flex items-start">
							<ShowIcon icon={Target} />
							<div className="ml-3 sm:ml-4">
								<h3 className={landingBulletTextTitle()}>Explore</h3>
								<p className={landingBulletTextParagraph()}>
									Discover different career paths and see what sparks Pip's interest.
								</p>
							</div>
						</div>

						<div className="flex items-start">
							<ShowIcon icon={Lightbulb}/>
							<div className="ml-3 sm:ml-4">
								<h3 className={landingBulletTextTitle()}>Master</h3>
								<p className={landingBulletTextParagraph()}>
									Learn the sensors, skills, and concepts each career demands.
								</p>
							</div>
						</div>

						<div className="flex items-start">
							<ShowIcon icon={Code2} />
							<div className="ml-3 sm:ml-4">
								<h3 className={landingBulletTextTitle()}>Build</h3>
								<p className={landingBulletTextParagraph()}>
									Write the code that transforms Pip into whatever he dreams of becoming.
								</p>
								<p className={landingBulletTextParagraph("mt-2 sm:mt-3")}>
									New to coding? No problem! We guide you through each step, and our AI
									checks your solutions for correctness.
								</p>
							</div>
						</div>
					</div>

					<p className={landingParagraph("mt-4 sm:mt-8")}>
						Anyone can start Career Quest for free! But having your own Pip turns your digital mentorship into
						<span className="font-semibold"> real-world transformation</span> – that's when the magic really happens.
					</p>

					<div className="pt-6 sm:pt-8 flex items-center justify-center">
						<LandingCTAButton navigateTo="/career-quest">
							Start Career Quest for free
						</LandingCTAButton>
					</div>
				</div>
			}
		/>
	)
}
