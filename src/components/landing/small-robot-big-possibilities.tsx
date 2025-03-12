import LandingSectionHeaderText from "./landing-section-header-text"
// import { LandingCTAButton } from "../buttons/tactile-buttons"

export default function SmallRobotBigPossibilities() {
	return (
		<div className="w-full">
			{/* Section title in Duolingo style */}
			<div className="flex flex-col md:flex-row justify-between w-full gap-16">
				{/* Left side with text - Duolingo style */}
				<div className="flex flex-col w-full md:w-1/2">
					<LandingSectionHeaderText text="small robot."/>
					<LandingSectionHeaderText text="big possibilities."/>
					<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText my-8">
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
				</div>

				{/* Right side with Pip image */}
				<div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
					<div className="relative">
						<img
							src="pip_right.png"
							alt="Pip Robot"
							className="max-w-full h-auto rounded-lg"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
