import { CodeXml, LucideIcon, BatteryCharging, Cloud, BrickWall, ChartNoAxesCombined, CircuitBoard } from "lucide-react"
import { cn } from "../../lib/shadcn/utils"
import { BoldSpanText } from "../bold-span-text"
import { bentoIconSize } from "../../utils/constants"

interface Feature {
	icon: LucideIcon
	title: string
	description: React.ReactNode
}

const features: Feature[] = [
	{
		icon: BatteryCharging,
		title: "Never Stop Building",
		description: (
			<>
				<BoldSpanText>
					2 hours of continuous learning
				</BoldSpanText>
				on a single charge, with USB-C
				<BoldSpanText>
					fast charging
				</BoldSpanText>
				that gets you back to building
				<BoldSpanText>
					in just 30 minutes.
				</BoldSpanText>
			</>
		)
	},
	{
		icon: BrickWall,
		title: "Stress Tested",
		description: (
			<>
				Built and stress-tested to
				<BoldSpanText>
				handle the demands of hands-on learning,
				</BoldSpanText>
				from classroom drops to home experiments.
			</>
		)
	},
	{
		icon: Cloud,
		title: "Progress Lives in the Cloud",
		description: (
			<>
				Your progress saves automatically (just like Google Docs), so
				<BoldSpanText>
				you can pick up where you left off -
				</BoldSpanText>
				on any Pip, from any computer.
			</>
		)
	},
	{
		icon: CircuitBoard,
		title: "See How It Works",
		description: (
			<>
				Pip's clear shell design reveals
				<BoldSpanText>
					real sensors and circuits in action,
				</BoldSpanText>
				turning abstract concepts into visible technology.
			</>
		)
	},
	{
		icon: CodeXml,
		title: "Code Your Way",
		description: (
			<>
				Start with drag-and-drop blocks and advance to text-based coding when you're ready.
				<BoldSpanText>
					Your pace, your journey.
				</BoldSpanText>
			</>
		)
	},
	{
		icon: ChartNoAxesCombined,
		title: "Track Your Growth",
		description: (
			<>
				Watch your skills evolve with
				<BoldSpanText>
					progress tracking
				</BoldSpanText>
				that celebrates every milestone, from basic movements to advanced robotics.
			</>
		)
	},
]

interface FeatureItemProps {
	feature: Feature
}

function FeatureItem({ feature }: FeatureItemProps) {
	const { icon: Icon, title, description } = feature

	return (
		<div className={cn(
			"group relative flex flex-col justify-between overflow-hidden rounded-xl",
			"bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
			"transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)]",
			"dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
		)}>
			<div className="z-10 flex transform-gpu flex-col gap-1 p-4 md:p-6">
				<div className="pointer-events-auto w-fit">
					<Icon
						className="text-pipTheme duration-300 cursor-default"
						size={bentoIconSize}
					/>
				</div>
				<h3 className="text-lg md:text-xl font-semibold text-zinc-800 dark:text-zinc-200">
					{title}
				</h3>
				<p className="max-w-lg text-sm md:text-base text-neutral-400">
					{description}
				</p>
			</div>
		</div>
	)
}


export default function FeaturesBento() {
	return (
		<div className="flex flex-col gap-6 md:gap-8">
			{/* Title */}
			<p className="text-center text-3xl md:text-6xl font-medium tracking-tight text-black dark:text-white px-4 md:px-0">
                It's the little things that count
			</p>

			{/* Features Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 md:px-0">
				{features.map((feature, index) => (
					<FeatureItem key={index} feature={feature} />
				))}
			</div>
		</div>
	)
}
