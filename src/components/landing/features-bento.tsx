import { CodeXml, LucideIcon, BatteryCharging, Cloud, BrickWall, ChartNoAxesCombined, CircuitBoard } from "lucide-react"
import { cn } from "../../lib/shadcn/utils"
import { BoldSpanText } from "./bold-span-text"
import { bentoIconSize } from "../../utils/constants"
import { BentoGrid } from "../shadcn/ui/bento-grid"

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
				&nbsp;on a single charge, with USB-C&nbsp;
				<BoldSpanText>
					fast charging
				</BoldSpanText>
				&nbsp;that gets you back to building&nbsp;
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
				Built and stress-tested to&nbsp;
				<BoldSpanText>
				handle the demands of hands-on learning,
				</BoldSpanText>
				&nbsp;from classroom drops to home experiments.
			</>
		)
	},
	{
		icon: Cloud,
		title: "Progress Lives in the Cloud",
		description: (
			<>
				Your progress saves automatically (just like Google Docs), so&nbsp;
				<BoldSpanText>
				you can pick up where you left off -
				</BoldSpanText>
				&nbsp;on any Pip, from any computer.
			</>
		)
	},
	// {
	// 	icon: FaWifi,
	// 	title: "Minimal Setup",
	// 	description: "Connect to Wi-Fi and start coding immediately. No complicated installations or downloads needed.",
	// },
	{
		icon: CircuitBoard,
		title: "See How It Works",
		description: (
			<>
				Pip&apos;s clear shell design reveals&nbsp;
				<BoldSpanText>
					real sensors and circuits in action,
				</BoldSpanText>
				&nbsp;turning abstract concepts into visible technology.
			</>
		)
	},
	{
		icon: CodeXml,
		title: "Code Your Way",
		description: (
			<>
				Start with drag-and-drop blocks and advance to text-based coding when you&apos;re ready.&nbsp;
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
				Watch your skills evolve with&nbsp;
				<BoldSpanText>
					progress tracking
				</BoldSpanText>
				&nbsp;that celebrates every milestone, from basic movements to advanced robotics.
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
		<div
			className={cn(
				"group relative flex flex-col justify-between overflow-hidden rounded-xl",
				"bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
				"transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)]",
				"dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
			)}
		>
			<div className="z-10 flex transform-gpu flex-col gap-1 p-6">
				<div className="pointer-events-auto w-fit">
					<Icon
						className="text-pipTheme duration-300 cursor-default"
						size={bentoIconSize}
					/>
				</div>
				<h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
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
