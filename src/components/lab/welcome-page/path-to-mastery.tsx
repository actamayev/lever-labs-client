/* eslint-disable max-len */
import {
	Cpu,
	CircuitBoard,
	Flag,
	Lightbulb,
	Gauge,
	Compass,
	Combine,
	Target,
	Timer
} from "lucide-react"
import RightArrow from "./right-arrow"
import WelcomePageCard from "./welcome-page-card"
import { SubIconSubtitleText, SubIconTitleText } from "./sub-icon-text"

// eslint-disable-next-line max-lines-per-function
export default function PathToMastery() {
	return (
		<WelcomePageCard headerText="Your Path to Mastery">
			<div className="flex flex-col md:flex-row items-center justify-between mb-6 relative px-20">
				{/* Connection line behind the circles */}
				<div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-purple-200 dark:bg-purple-800 -z-10" />

				{/* Element 1 */}
				<div className="flex flex-col items-center mb-4 md:mb-0 group">
					<div className="relative">
						<div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
							<Cpu className="w-10 h-10 text-blue-600 dark:text-blue-400" />
						</div>
						{/* Orbiting icons */}
						<div className="absolute top-0 left-0 w-full h-full animate-spin-slow">
							<Lightbulb className="w-6 h-6 text-yellow-500 absolute top-0 left-1/2 -translate-x-1/2" />
							<Gauge className="w-6 h-6 text-green-500 absolute bottom-0 left-1/2 -translate-x-1/2" />
							<Compass className="w-6 h-6 text-red-500 absolute left-0 top-1/2 -translate-y-1/2" />
						</div>
					</div>
					<SubIconTitleText text="Element 1" />
					<SubIconSubtitleText text="Get started with sensor basics" />
				</div>

				<RightArrow />

				{/* Element 2 */}
				<div className="flex flex-col items-center mb-4 md:mb-0 group">
					<div className="relative">
						<div className="w-24 h-24 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
							<CircuitBoard className="w-10 h-10 text-purple-600 dark:text-purple-400" />
						</div>
						{/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16">
								<Combine className="w-8 h-8 text-purple-500/50 absolute animate-pulse" />
							</div> */}
					</div>
					<SubIconTitleText text="Element 2" />
					<SubIconSubtitleText text="Combine & Create" />
				</div>

				<RightArrow />

				{/* Element 3 */}
				<div className="flex flex-col items-center group">
					<div className="relative">
						<div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
							<Flag className="w-10 h-10 text-green-600 dark:text-green-400" />
						</div>
						{/* Mission preview icons */}
						<Target className="w-6 h-6 text-green-500/70 absolute -top-2 -right-2 animate-ping" />
						<Timer className="w-6 h-6 text-green-500/70 absolute -bottom-2 -left-2 animate-pulse" />
					</div>
					<SubIconTitleText text="Element 3" />
					<SubIconSubtitleText text="Missions: Complete Challenges" />
				</div>
			</div>
		</WelcomePageCard>
	)
}
