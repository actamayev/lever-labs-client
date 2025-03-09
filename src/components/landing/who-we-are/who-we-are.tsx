import BlueDot from "./blue-dot"
import { BoldedDescription } from "../../bold-span-text"

export default function WhoWeAre() {
	return (
		<div className="flex flex-col md:flex-row w-full gap-6 md:gap-8 lg:gap-16">
			{/* Blue Dot Section */}
			<div className="flex-1 flex items-center justify-center">
				<BlueDot />
			</div>

			{/* Text Content Section */}
			<div className="flex-1 flex flex-col justify-center">
				<div className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
					<span className="font-medium tracking-wide text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center md:text-left">
                        Built by engineers,
						<div>for future engineers</div>
					</span>
				</div>
				<div className="text-lg sm:text-xl md:text-2xl lg:text-3xl mt-4 md:mt-6">
					<div className="text-gray-500 dark:text-gray-400 text-center md:text-left">
                        We know getting started with robotics can seem tough and feel daunting. We've been there...
					</div>
					<div className="mt-4 text-gray-500 dark:text-gray-400 text-center md:text-left">
                        We designed Pip to make learning robotics
						<BoldedDescription extraClasses="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                            fun and seamless.
						</BoldedDescription>
					</div>
				</div>
			</div>
		</div>
	)
}
