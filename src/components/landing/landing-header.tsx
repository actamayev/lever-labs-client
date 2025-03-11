export default function LandingHeader () {
	return (
		<div className="flex flex-col md:flex-row justify-between w-full gap-8">
			{/* Right side with Pip image */}
			<div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0 items-center">
				<img
					src="pip_top_right.png"
					alt="Pip Robot"
					className="max-w-full h-auto"
				/>
			</div>
			{/* Left side with text and buttons */}
			<div className="flex flex-col space-y-6 w-full md:w-1/2 mt-20">
				<h1 className="text-3xl md:text-2xl lg:text-4xl text-unselectedAnswerText text-center leading-relaxed">
					The best way to learn robotics is with a partner!
				</h1>
				<h2 className="text-3xl md:text-2xl lg:text-4xl text-unselectedAnswerText text-center leading-relaxed font-semibold">
					Meet Pip
				</h2>
			</div>
		</div>
	)
}
