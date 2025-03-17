"use client"

import Image from "next/image"
import { BookOpen, Code2 } from "lucide-react"
import ShowIcon from "./show-icon"
import LandingSectionSplit from "./landing-section-split"
import { CustomWizardHat } from "../icons/custom-wizard-hat"
import { LandingCTAButton } from "../buttons/tactile-buttons"
import LandingSectionHeaderText from "./landing-section-header-text"
import { landingBulletTextParagraph, landingBulletTextTitle, landingParagraph } from "../../utils/text-styles"

export default function TheLab() {
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
					<LandingSectionHeaderText text="the lab" />
					<p className={landingParagraph("mt-4 sm:mt-8")}>
						The Lab is our free learning platform where your robotics journey begins.
						As you move through bite-sized lessons, you'll go from
						<span className="font-semibold"> curious beginner to robotics whiz:</span>
					</p>

					{/* ShowIconed points */}
					<div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
						<div className="flex items-start">
							<ShowIcon icon={CustomWizardHat} />
							<div className="ml-3 sm:ml-4">
								<h3 className={landingBulletTextTitle()}>Demos</h3>
								<p className={landingBulletTextParagraph()}>
									Watch Pip show off the very things you're learning about.
								</p>
							</div>
						</div>

						<div className="flex items-start">
							<ShowIcon icon={BookOpen}/>
							<div className="ml-3 sm:ml-4">
								<h3 className={landingBulletTextTitle()}>Read</h3>
								<p className={landingBulletTextParagraph()}>
									Simple explanations that clarify tricky concepts.
								</p>
							</div>
						</div>

						<div className="flex items-start">
							<ShowIcon icon={Code2} />
							<div className="ml-3 sm:ml-4">
								<h3 className={landingBulletTextTitle()}>Code</h3>
								<p className={landingBulletTextParagraph()}>
									Solve fun coding challenges that test your skills and bring Pip to life!
								</p>
								<p className={landingBulletTextParagraph("mt-2 sm:mt-3")}>
									New to coding? No problem! We guide you through each step, and our AI
									checks your solutions for correctness.
								</p>
							</div>
						</div>
					</div>

					<p className={landingParagraph("mt-4 sm:mt-8")}>
						Anyone can use the Lab for free! But having your own Pip turns your digital ideas into
						<span className="font-semibold"> real-world action</span> – that's when the magic really happens.
					</p>

					<div className="pt-6 sm:pt-8 flex items-center justify-center">
						<LandingCTAButton navigateTo="/lab">
							Try the lab for free
						</LandingCTAButton>
					</div>
				</div>
			}
		/>
	)
}
