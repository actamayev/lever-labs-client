"use client"

export default function LandingHeader () {
	return (
		<div className="flex flex-col md:flex-row justify-between w-full gap-4 sm:gap-8">
			{/* Right side with Pip image */}
			<div className="w-full md:w-1/2 flex justify-center mt-5 md:mt-0 sm:mt-5 items-center"> {/* Increased top margin on mobile */}
				<img
					src="pip_top_right.png"
					alt="Pip Robot"
					className="max-w-full h-auto rounded-lg w-full sm:w-4/5 md:w-auto mx-auto"
				/>
			</div>
			{/* Left side with text and buttons */}
			<div className="flex flex-col space-y-4 sm:space-y-6 w-full md:w-1/2 mt-6 sm:mt-10 md:mt-20">
				<h1 className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl text-unselectedAnswerText text-center font-medium
				leading-tight sm:leading-relaxed"> {/* Decreased line spacing on mobile */}
					The best way to learn robotics is with a partner!
				</h1>
				<h2 className="text-3xl sm:text-3xl md:text-2xl lg:text-4xl text-unselectedAnswerText
				text-center leading-relaxed font-bold">
					Meet Pip
				</h2>
			</div>
		</div>
	)
}
