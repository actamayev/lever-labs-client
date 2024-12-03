/* eslint-disable max-len */
import { IconType } from "react-icons"
// import { FaWifi } from "react-icons/fa"
import { HiCode } from "react-icons/hi"
import { CiCloudOn } from "react-icons/ci"
// import { MdSensors } from "react-icons/md"
import { GiBrickWall } from "react-icons/gi"
import { IoAnalytics } from "react-icons/io5"
import { LuCircuitBoard } from "react-icons/lu"
// import { ChartNoAxesCombined } from "lucide-react"
import { IoMdBatteryCharging } from "react-icons/io"
import { cn } from "../../lib/shadcn/utils"
import { bentoIconSize } from "../../utils/constants"
import { BentoGrid } from "../shadcn/ui/custom-bento-grid"

interface Feature {
	icon: IconType
	title: string
	description: string
	bentoClasses: string
}

const features: Feature[] = [
	{
		icon: IoMdBatteryCharging,
		title: "Never Stop Building",
		description: "2 hours of continuous learning on a single charge, with USB-C fast charging that gets you back to building in just 30 minutes.",
		bentoClasses: ""
	},
	{
		icon: GiBrickWall,
		title: "Stress Tested",
		description: "Built and stress-tested to handle the demands of hands-on learning, from classroom drops to home experiments.",
		bentoClasses: ""
	},
	{
		icon: CiCloudOn,
		title: "Progress Lives in the Cloud",
		description: "Your projects and learning progress sync instantly across devices, just like Google Docs. Pick up right where you left off.",
		bentoClasses: ""
	},
	// {
	// 	icon: FaWifi,
	// 	title: "Minimal Setup",
	// 	description: "Connect to Wi-Fi and start coding immediately. No complicated installations or downloads needed.",
	// 	bentoClasses: ""
	// },
	{
		icon: LuCircuitBoard,
		title: "See How It Works",
		description: "Clear shell design reveals real sensors and circuits in action, turning abstract concepts into visible technology.",
		bentoClasses: ""
	},
	{
		icon: HiCode,
		title: "Code Your Way",
		description: "Start with drag-and-drop blocks and advance to text-based coding when you're ready. Your pace, your journey.",
		bentoClasses: ""
	},
	{
		icon: IoAnalytics,
		title: "Track Your Growth",
		description: "Watch your skills evolve with progress tracking that celebrates every milestone, from basic movements to advanced robotics.",
		bentoClasses: ""
	},
	// {
	// 	icon: MdSensors,
	// 	title: "10 Built-in Sensors",
	// 	description: "Packed with distance sensors, encoders, IMU, and RGB LEDs. Everything you need to bring your ideas to life.",
	// 	bentoClasses: ""
	// }
]

interface FeatureItemProps {
	feature: Feature
}

function FeatureItem({ feature }: FeatureItemProps) {
	const { icon: Icon, title, description, bentoClasses } = feature

	return (
		<div
			className={cn(
				"group relative flex flex-col justify-between overflow-hidden rounded-xl",
				"bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
				"transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)]",
				"dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
				bentoClasses
			)}
		>
			<div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6">
				<div className="pointer-events-auto w-fit">
					<Icon
						className="text-pipTheme duration-300 cursor-pointer"
						size={bentoIconSize}
					/>
				</div>
				<h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
					{title}
				</h3>
				<p className="max-w-lg text-neutral-400">
					{description}
				</p>
			</div>
		</div>
	)
}

export default function FeaturesBento() {
	return (
		<div className="flex flex-col gap-8">
			<p className="text-center text-6xl font-medium tracking-tight text-black dark:text-white">
				It&apos;s the little things that count
			</p>
			<BentoGrid>
				{features.map((feature, index) => (
					<FeatureItem key={index} feature={feature} />
				))}
			</BentoGrid>
		</div>
	)
}
