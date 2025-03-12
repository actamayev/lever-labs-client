import LandingSectionHeaderText from "./landing-section-header-text"
import LandingSectionSplit from "./landing-section-split"
// import { LandingCTAButton } from "../buttons/tactile-buttons"

export default function SmallRobotBigPossibilities() {
	return (
		<LandingSectionSplit
			imagePosition="right"
			leftContent={
				<>
					<LandingSectionHeaderText text="small robot."/>
					<LandingSectionHeaderText text="big possibilities."/>
					<p className="text-base sm:text-lg md:text-base leading-relaxed text-lightLandingPageText my-4 sm:my-8">
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
				<div className="relative">
					<img
						src="pip_right.png"
						alt="Pip"
						className="max-w-full h-auto rounded-lg w-4/5 sm:w-auto"
					/>
				</div>
			}
		/>
	)
}
