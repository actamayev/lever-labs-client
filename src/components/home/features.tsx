import { GiBrickWall } from "react-icons/gi"
import { IoMdBatteryCharging } from "react-icons/io"
import { IconType } from "react-icons"
import { Card } from "@/components/shadcn/ui/card"

interface Feature {
	icon: IconType
	title: string
	description: string
}

// Example features array - you can move this to a separate file
const features: Feature[] = [
	{
		icon: IoMdBatteryCharging,  // Replace with your actual icons
		title: "Just keep building",
		description: "Pip is efficient. Up to 2 hours of continuous use, with 30 minute charge times."
	},
	{
		icon: GiBrickWall,
		title: "Built to last",
		description: "Talk about the durability."
	},
	{
		icon: IoMdBatteryCharging,  // Replace with your actual icons
		title: "Just keep building",
		description: "Pip is efficient. Up to 2 hours of continuous use, with 30 minute charge times."
	},
	{
		icon: GiBrickWall,
		title: "Built to last",
		description: "Talk about the durability."
	},
	{
		icon: IoMdBatteryCharging,  // Replace with your actual icons
		title: "Just keep building",
		description: "Pip is efficient. Up to 2 hours of continuous use, with 30 minute charge times."
	},
	{
		icon: GiBrickWall,
		title: "Built to last",
		description: "Talk about the durability."
	},
	{
		icon: IoMdBatteryCharging,  // Replace with your actual icons
		title: "Just keep building",
		description: "Pip is efficient. Up to 2 hours of continuous use, with 30 minute charge times."
	},
	{
		icon: GiBrickWall,
		title: "Built to last",
		description: "Talk about the durability."
	},
]

interface FeatureItemProps {
	feature: Feature
}

function FeatureItem({ feature }: FeatureItemProps) {
	const { icon: Icon, title, description } = feature

	return (
		<div className="carousel-item">
			<div className="bg-white dark:bg-zinc-900 p-6 mx-4 flex flex-col rounded-xl shadow-lg items-start text-start min-h-[300px]">
				<Icon className="w-12 h-12 text-blue-500 mb-4" />
				<h3 className="text-xl font-semibold mb-2">{title}</h3>
				<p className="text-zinc-600 dark:text-zinc-400 line-clamp-4">{description}</p>
			</div>
		</div>
	)
}

export default function FeatureCarousel() {
	return (
		<div className="w-full py-32">
			<div className="carousel rounded-box">
				{features.map((feature, index) => (
					<FeatureItem key={index} feature={feature} />
				))}
			</div>
		</div>
	)
}
