import LandingSectionHeaderText from "./landing-section-header-text"

export default function CodeThatComesAlive() {
	return (
		<div className="w-full">
			<LandingSectionHeaderText text="code that comes alive" />

			<div className="flex flex-col md:flex-row justify-between w-full gap-16 mt-8">
				{/* Right side intentionally left empty as requested */}
				<div className="w-full md:w-1/2">
					{/* This space is intentionally left empty */}
				</div>
				{/* Left side with text content */}
				<div className="flex flex-col w-full md:w-1/2">
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
			</div>
		</div>
	)
}
