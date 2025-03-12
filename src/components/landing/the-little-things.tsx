import { CodeXml, LucideIcon, BatteryCharging, Cloud, BrickWall, ChartNoAxesCombined, CircuitBoard } from "lucide-react"
import { cn } from "../../lib/shadcn/utils"
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
				2 hours of continuous learning on a single charge, with USB-Cfast charging
				that gets you back to building in just 30 minutes.
			</>
		)
	},
	{
		icon: BrickWall,
		title: "Stress Tested",
		description: (
			<>
				Built and stress-tested to handle the demands of hands-on learning,
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
				you can pick up where you left off -
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
				real sensors and circuits in action,
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
					Your pace, your journey.
			</>
		)
	},
	{
		icon: ChartNoAxesCombined,
		title: "Track Your Growth",
		description: (
			<>
				Watch your skills evolve with
					progress tracking
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
			"bg-standardBackground shadow-md hover:shadow-lg transition-shadow duration-300",
			"transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)]",
			"dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
		)}>
			<div className="z-10 flex transform-gpu flex-col gap-1 p-3 sm:p-4 md:p-6">
				<div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
					<div className="pointer-events-auto w-fit">
						<Icon
							className="text-pipThemeText duration-300 cursor-default"
							size={bentoIconSize}
							strokeWidth={2}
						/>
					</div>
					<h3 className="text-base sm:text-lg md:text-xl font-semibold text-unselectedAnswerText">
						{title}
					</h3>
				</div>
				<p className="max-w-lg text-xs sm:text-sm md:text-base text-lightLandingPageText">
					{description}
				</p>
			</div>
		</div>
	)
}

export default function TheLittleThings() {
	return (
		<div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
			{/* Title */}
			<p className="text-center text-2xl sm:text-3xl md:text-5xl lg:text-6xl
			font-medium text-white dark:text-unselectedAnswerText px-4 md:px-0">
                It's the little things that count
			</p>

			{/* Features Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 px-4 md:px-0">
				{features.map((feature, index) => (
					<FeatureItem key={index} feature={feature} />
				))}
			</div>
		</div>
	)
}
