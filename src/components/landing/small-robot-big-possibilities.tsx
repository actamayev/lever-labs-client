"use client"

import Image from "next/image"
import { landingParagraph } from "../../utils/text-styles"
import LandingSectionHeaderText from "./landing-section-header-text"
import LandingSectionSplit from "./landing-section-split"
// import { LandingCTAButton } from "../buttons/tactile-buttons"

export default function SmallRobotBigPossibilities(): React.ReactNode {
	return (
		<LandingSectionSplit
			imagePosition="right"
			leftContent={
				<>
					<LandingSectionHeaderText text="small robot." extraClasses="text-4xl"/>
					<LandingSectionHeaderText text="big possibilities." extraClasses="text-4xl"/>
					<p className={landingParagraph("my-3 sm:my-6 md:my-8")}>
						With Pip by your side,&nbsp;
						<span className="font-semibold">learning feels like play:</span> write code to solve fun challenges,
						and watch your ideas
						spring to life right before your eyes.
						Pip might fit in your pocket, but this tiny robot is full of big surprises!
					</p>
					{/* <div className="flex items-center justify-center">
						<LandingCTAButton navigateTo="/login">
							Get your Pip
						</LandingCTAButton>
					</div> */}
				</>
			}
			rightContent={
				<div className="relative w-full sm:w-4/5 md:w-[500px] h-[300px] sm:h-[350px] md:h-[400px]">
					<Image
						src="/pip_right.png"
						alt="Pip"
						className="max-w-full h-auto rounded-lg w-full sm:w-4/5 md:w-auto mx-auto"
						fill
						sizes="(max-width: 768px) 80vw, 500px"
						style={{ objectFit: "contain" }}
						priority
					/>
				</div>
			}
		/>
	)
}
