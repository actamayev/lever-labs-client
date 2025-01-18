import {
	Cpu,
	CircuitBoard,
	Flag,
	Gauge,
	Target,
	Timer
} from "lucide-react"
import RightArrow from "./right-arrow"
import { IconStep } from "./welcome-page-icons"
import WelcomePageCard from "./welcome-page-card"
import { CustomLightbulb } from "../../icons/custom-lightbulb"
import { CustomCompass } from "../../icons/custom-compass"

export default function PathToMastery() {
	return (
		<WelcomePageCard headerText="Your Path to Mastery">
			<div className="flex flex-col md:flex-row items-center justify-between mb-6 relative px-20">
				<IconStep
					icon={CircuitBoard}
					title="Element 1"
					subtitle="Sensor basics"
					elementLink="/lab/element-1"
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
							<CustomLightbulb className="w-6 h-6 text-yellow-500 absolute top-0 left-1/2 -translate-x-1/2" />
							<Gauge className="w-6 h-6 text-green-500 absolute bottom-0 left-1/2 -translate-x-1/2" />
							<CustomCompass className="w-6 h-6 text-red-500 absolute left-0 top-1/2 -translate-y-1/2" />
						</div>
					}
					elementLink="/lab/element-2"
				/>

				<RightArrow />

				<IconStep
					icon={Flag}
					bgColor="bg-green-100"
					iconColor="text-green-600"
					darkBgColor="dark:bg-green-900/50"
					darkIconColor="dark:text-green-400"
					title="Element 3"
					subtitle="Missions"
					orbitingIcons={
						<>
							<Target className="w-6 h-6 text-green-500/70 absolute -top-2 -right-2" />
							<Timer className="w-6 h-6 text-green-500/70 absolute -bottom-2 -left-2" />
						</>
					}
					elementLink="/lab/element-3"
				/>
			</div>
		</WelcomePageCard>
	)
}
