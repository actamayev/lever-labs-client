import LandingSectionSplit from "./landing-section-split"
import LandingSectionHeaderText from "./landing-section-header-text"

export default function CodeThatComesAlive() {
	return (
		<LandingSectionSplit
			leftContent={
				<>
					<LandingSectionHeaderText text="code that"/>
					<LandingSectionHeaderText text="comes alive"/>
					<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText my-8">
						With Pip by your side,&nbsp;
						<span className="font-semibold">learning feels like play:</span> write code to solve fun challenges,
						and watch your ideas
						spring to life right before your eyes.
						Pip might fit in your pocket, but this tiny robot is full of big surprises!
					</p>
				</>
			}
			rightContent={
				<div className="flex flex-col w-full">
					<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mb-6">
						Type a line of code, and Pip responds right away! Program Pip to zoom through mazes,
						follow lines, or dance to your favorite song. Each challenge puts your skills to the
						test with immediate results you can actually see.
					</p>

					<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText">
						Stuck on a tricky problem? Our friendly AI assistant looks at your code, spots the issues,
						and gives you hints – just like having a helpful friend by your side.
					</p>
				</div>
			}
		/>
	)
}
