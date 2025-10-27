import { StarIcon, LockKeyholeIcon, ShieldBanIcon, BatteryFullIcon, CodeIcon, ChartNoAxesCombined } from "lucide-react"

import Features from "@/components/ui/features-section"
import LandingContainer from "./landing-container"

const featuresList = [
	{
		icon: BatteryFullIcon,
		title: "Never Stop Building",
		description:
      "2 hours of continuous learning on a single charge, with USB-C fast charging that gets you back to building in just 30 minutes.",
		cardBorderColor: "border-green-600/40 hover:border-green-600 dark:border-green-400/40 dark:hover:border-green-400",
		avatarTextColor: "text-green-600 dark:text-green-400",
		avatarBgColor: "bg-green-600/10 dark:bg-green-400/10"
	},
	{
		icon: CodeIcon,
		title: "Code Your Way",
		description:
      "Start with drag-and-drop blocks and advance to text-based coding when you're ready. Your pace, your journey.",
		cardBorderColor: "border-lever-red/40 hover:border-lever-red",
		avatarTextColor: "text-lever-red",
		avatarBgColor: "bg-lever-red/10"
	},
	{
		icon: ChartNoAxesCombined,
		title: "Track Your Growth",
		description:
      "Watch your skills evolve with progress tracking that celebrates every milestone, from basic movements to advanced robotics.",
		cardBorderColor: "border-lever-blue/40 hover:border-lever-blue",
		avatarTextColor: "text-lever-blue",
		avatarBgColor: "bg-lever-blue/10"
	}
]

export default function FeaturesSection(): React.ReactNode {
	return (
		<section className="bg-polar">
			<LandingContainer>
				<Features featuresList={featuresList} />
			</LandingContainer>
		</section>
	)
}
