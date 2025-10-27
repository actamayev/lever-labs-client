import { BatteryFullIcon, CodeIcon, ChartNoAxesCombined } from "lucide-react"

import Features from "@/components/ui/features-section"
import LandingContainer from "./landing-container"

const featuresList = [
	{
		icon: BatteryFullIcon,
		title: "Keep the fun going",
		description:
      "Get 2 hours of learning on a single charge. Need more? USB-C fast charging gets you back to building in just 30 minutes.",
		cardBorderColor: "border-green-600/40 hover:border-green-600 dark:border-green-400/40 dark:hover:border-green-400",
		avatarTextColor: "text-green-600 dark:text-green-400",
		avatarBgColor: "bg-green-600/10 dark:bg-green-400/10"
	},
	{
		icon: CodeIcon,
		title: "Learn at your own pace",
		description:
      "Start with drag-and-drop blocks and move to text-based coding whenever you're ready. No pressure, just progress at your own pace.",
		cardBorderColor: "border-lever-red/40 hover:border-lever-red",
		avatarTextColor: "text-lever-red",
		avatarBgColor: "bg-lever-red/10"
	},
	{
		icon: ChartNoAxesCombined,
		title: "Celebrate your wins",
		description:
      "See how far you've come! Our progress tracking celebrates every win, from your first basic movement to advanced robotics projects.",
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
