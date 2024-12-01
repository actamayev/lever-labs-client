/* eslint-disable max-len */
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
]

interface FeatureItemProps {
  feature: Feature
}

function FeatureItem({ feature }: FeatureItemProps) {
	const { icon: Icon, title, description } = feature

	return (
		<Card className="bg-white dark:bg-zinc-900 p-6 mx-4 flex flex-col items-center text-center h-full">
			<Icon className="w-12 h-12 text-blue-500 mb-4" />
			<h3 className="text-xl font-semibold mb-2">{title}</h3>
			<p className="text-zinc-600 dark:text-zinc-400">{description}</p>
		</Card>
	)
}

export default function FeatureCarousel() {
	return (
		<div className="w-full">
			{/* Your existing Carousel component */}
			<div className="carousel rounded-box">
				{features.map((feature, index) => (
					<FeatureItem key={index} feature={feature} />
				))}
			</div>
		</div>
	)
}
