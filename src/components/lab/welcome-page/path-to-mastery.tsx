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
import { BlueTactileButton } from "../../tactile-buttons"
import { CustomCompass } from "../../icons/custom-compass"
import { CustomLightbulb } from "../../icons/custom-lightbulb"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"

export default function PathToMastery() {
	const navigate = useTypedNavigate()

	return (
		<WelcomePageCard headerText="Your Path to Mastery">
			<div className="flex flex-col md:flex-row items-center justify-between relative px-20 mb-10">
				<div className="flex flex-col">
					<IconStep
						icon={CircuitBoard}
						title="Element 1: Sensor Basics"
						elementLink="/lab/element-1"
						iconSize="size-20"
						backgroundSize="size-32"
						subtitle="Learn about the fundementals of each Pip's sensors."
					/>
				</div>

				<RightArrow iconSize="size-10"/>

				<IconStep
					icon={Cpu}
					bgColor="bg-purple-100"
					iconColor="text-purple-600"
					darkBgColor="dark:bg-purple-900/50"
					darkIconColor="dark:text-purple-400"
					title="Element 2: Combine & Create"
					orbitingIcons={
						<div className="absolute top-0 left-0 w-full h-full animate-spin-slow">
							<CustomLightbulb className="w-7 h-7 text-yellow-500 absolute top-0 left-1/2 -translate-x-1/2" />
							<Gauge className="w-7 h-7 text-green-500 absolute bottom-0 left-1/2 -translate-x-1/2" />
							<CustomCompass className="w-7 h-7 text-red-500 absolute left-0 top-1/2 -translate-y-1/2" />
						</div>
					}
					elementLink="/lab/element-2"
					iconSize="size-20"
					backgroundSize="size-32"
					subtitle="Write programs that make use of multiple sensors."
				/>

				<RightArrow iconSize="size-10"/>

				<IconStep
					icon={Flag}
					bgColor="bg-green-100"
					iconColor="text-green-600"
					darkBgColor="dark:bg-green-900/50"
					darkIconColor="dark:text-green-400"
					title="Element 3: Missions"
					orbitingIcons={
						<>
							<Target className="w-10 h-10 text-green-500/70 absolute -top-2 -right-2" />
							<Timer className="w-10 h-10 text-green-500/70 absolute -bottom-2 -left-2" />
						</>
					}
					elementLink="/lab/element-3"
					iconSize="size-20"
					backgroundSize="size-32"
					subtitle="Take on complex challenges to test your limits."
				/>
			</div>
			<BlueTactileButton
				onClick={() => navigate("/lab/element-1")}
				className="w-full text-xl h-12"
				shadowHeight={4}
			>
				START LEARNING
			</BlueTactileButton>
		</WelcomePageCard>
	)
}
