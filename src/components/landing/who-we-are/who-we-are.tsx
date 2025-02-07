import BlueDot from "./blue-dot"
import { BoldedDescription } from "../../bold-span-text"

export default function WhoWeAre() {
	return (
		<div className="flex flex-col md:flex-row w-full gap-8 md:gap-16">
			{/* Blue Dot Section */}
			<div className="flex-1">
				<BlueDot />
			</div>

			{/* Divider - Hidden on mobile */}
			{/* <div className="hidden md:block mx-16 h-full border-l border-dashed
                border-zinc-200 dark:border-zinc-800 self-stretch" /> */}

			{/* Text Content Section */}
			<div className="flex-1">
				<div className="flex items-center space-x-2 text-zinc-900 dark:text-zinc-100">
					<span className="font-medium tracking-wide text-4xl md:text-6xl text-center md:text-left">
                        Built by engineers,
						<div>for future engineers</div>
					</span>
				</div>
				<div className="text-xl md:text-3xl mt-6">
					<div className="text-zinc-500 dark:text-zinc-400 text-center md:text-left">
                        We know getting started with robotics can seem tough and feel daunting. We've been there...
					</div>
					<br />
					<div className="text-zinc-500 dark:text-zinc-400 text-center md:text-left">
                        We designed Pip to make learning robotics
						<BoldedDescription extraClasses="text-xl md:text-3xl">
                            fun and seamless.
						</BoldedDescription>
					</div>
				</div>
			</div>
		</div>
	)
}
