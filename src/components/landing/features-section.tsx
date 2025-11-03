/* eslint-disable max-len */
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CodeIcon, ChartNoAxesCombined, Share2 } from "lucide-react"
import LandingContainer from "./landing-container"
import LandingSectionHeaderText from "../landing/landing-section-header-text"

const featuresList = [
	{
		icon: CodeIcon,
		title: "Your pace, your way",
		description: "Start with drag-and-drop blocks and move to text-based coding whenever you're ready. No pressure, just progress at your own pace.",
		cardBorderColor: "border-lever-red/40 hover:border-lever-red",
		avatarTextColor: "text-lever-red",
		avatarBgColor: "bg-lever-red/10"
	},
	{
		icon: Share2,
		title: "Join the Lever Labs community",
		description: "Share projects, discover what others have built, and get inspired. Learning is better with friends.",
		cardBorderColor: "border-lever-blue/40 hover:border-lever-blue",
		avatarTextColor: "text-lever-blue",
		avatarBgColor: "bg-lever-blue/10"
	},
	{
		icon: ChartNoAxesCombined,
		title: "Track your progress",
		description: "See how far you've come! Our progress tracking celebrates every win, from your first basic movement to advanced robotics projects.",
		cardBorderColor: "border-green-600/40 hover:border-green-600 dark:border-green-400/40 dark:hover:border-green-400",
		avatarTextColor: "text-green-600 dark:text-green-400",
		avatarBgColor: "bg-green-600/10 dark:bg-green-400/10"
	}
]

export default function FeaturesSection(): React.ReactNode {
	return (
		<section className="bg-polar pt-8 md:pt-16">
			<LandingContainer>
				<section className='pb-8 sm:pb-16 lg:pb-24'>
					<div>
						{/* Header */}
						<div className='mb-6 space-y-4 sm:mb-8 lg:mb-12 text-center'>
							<LandingSectionHeaderText text="Small details. Big smiles." />
						</div>

						<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
							{featuresList.map((features, index): React.ReactNode => (
								<Card key={index} className={cn("shadow-none transition-colors duration-300", features.cardBorderColor)}>
									<CardContent>
										<Avatar className={cn("mb-6 size-10 rounded-md", features.avatarTextColor)}>
											<AvatarFallback className={cn("rounded-md [&>svg]:size-6", features.avatarBgColor)}>
												<features.icon />
											</AvatarFallback>
										</Avatar>
										<h3 className='mb-2 text-lg font-semibold'>{features.title}</h3>
										<p className='text-muted-foreground'>{features.description}</p>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>
			</LandingContainer>
		</section>
	)
}
