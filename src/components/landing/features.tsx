import { IconType } from "react-icons"
import { GiBrickWall } from "react-icons/gi"
import { IoMdBatteryCharging } from "react-icons/io"
import { BentoGrid } from "../shadcn/ui/custom-bento-grid"
import { bentoIconSize } from "../../utils/constants"
import { cn } from "../../lib/shadcn/utils"

interface Feature {
	icon: IconType
	title: string
	description: string
	bentoClasses: string
}

// TODO: Come up with more features
// TODO: Get the features to be the same width as one another
const features: Feature[] = [
	{
		icon: IoMdBatteryCharging,  // Replace with your actual icons
		title: "Just keep building",
		description: "Pip is efficient. Up to 2 hours of continuous use, with 30 minute charge times.",
		bentoClasses: "row-start-1 col-start-1"
	},
	{
		icon: GiBrickWall,
		title: "Built to last",
		description: "Talk about the durability.",
		bentoClasses: "row-start-1 col-start-2 col-end-2"
	},
	{
		icon: IoMdBatteryCharging,  // Replace with your actual icons
		title: "Say something about saving your projects ",
		description: "so they're available anywhere.",
		bentoClasses: "row-start-1 row-span-2 col-start-3 col-end-3"
	},
	{
		icon: GiBrickWall,
		title: "Built to last",
		description: "Talk about the durability.",
		bentoClasses: "row-start-2 col-start-1 col-span-2"
	}
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

export default function FeatureCarousel() {
	return (
		<div className="flex">
			<BentoGrid className="lg:grid-rows-3">
				{features.map((feature, index) => (
					<FeatureItem key={index} feature={feature} />
				))}
			</BentoGrid>
		</div>
	)
}
