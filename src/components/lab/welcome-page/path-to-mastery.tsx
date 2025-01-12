/* eslint-disable max-len */
import {
	Cpu,
	CircuitBoard,
	Flag,
	Lightbulb,
	Gauge,
	Compass,
	Target,
	Timer
} from "lucide-react"
import RightArrow from "./right-arrow"
import WelcomePageCard from "./welcome-page-card"
import { IconStep } from "./welcome-page-icons"

// eslint-disable-next-line max-lines-per-function
export default function PathToMastery() {
	return (
		<WelcomePageCard headerText="Your Path to Mastery">
			<div className="flex flex-col md:flex-row items-center justify-between mb-6 relative px-20">
				<IconStep
					icon={CircuitBoard}
					title="Element 1"
					subtitle="Get started with sensor basics"
				/>

				<RightArrow />

				<IconStep
					icon={Cpu}
					bgColor="bg-purple-100"
					iconColor="text-purple-600"
					darkBgColor="dark:bg-purple-900/50"
					darkIconColor="dark:text-purple-400"
					title="Element 2"
					subtitle="Combine & Create"
					orbitingIcons={
						<div className="absolute top-0 left-0 w-full h-full animate-spin-slow">
							<Lightbulb className="w-6 h-6 text-yellow-500 absolute top-0 left-1/2 -translate-x-1/2" />
							<Gauge className="w-6 h-6 text-green-500 absolute bottom-0 left-1/2 -translate-x-1/2" />
							<Compass className="w-6 h-6 text-red-500 absolute left-0 top-1/2 -translate-y-1/2" />
						</div>
					}
				/>

				<RightArrow />

				<IconStep
					icon={Flag}
					bgColor="bg-green-100"
					iconColor="text-green-600"
					darkBgColor="dark:bg-green-900/50"
					darkIconColor="dark:text-green-400"
					title="Element 3"
					subtitle="Missions: Complete Challenges"
					orbitingIcons={
						<>
							<Target className="w-6 h-6 text-green-500/70 absolute -top-2 -right-2 animate-ping" />
							<Timer className="w-6 h-6 text-green-500/70 absolute -bottom-2 -left-2 animate-pulse" />
						</>
					}
				/>
			</div>
		</WelcomePageCard>
	)
}
