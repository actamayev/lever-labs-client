"use client"

import LandingContainer from "./landing-container"
import LandingSectionHeaderText from "./landing-section-header-text"

interface Feature {
	step: string
	title: string
	description: string
	imagePlaceholder: string
}

const features: Feature[] = [
	{
		step: "1",
		title: "Take Pip out of the box",
		description: "No assembly required.",
		imagePlaceholder: "/placeholder-unbox.jpg"
	},
	{
		step: "2",
		title: "Give Pip Wi-Fi access",
		description: "Plug Pip into your computer, and give Pip access to your Wi-Fi (takes less than a minute).",
		imagePlaceholder: "/placeholder-wifi.jpg"
	},
	{
		step: "3",
		title: "That's it!",
		description: "Now you can control and communicate with your Pip completely wirelessly.",
		imagePlaceholder: "/placeholder-learning.jpg"
	}
]

export default function SimpleFeaturesSection(): React.ReactNode {
	return (
		<section className="bg-lever-blue py-16 md:py-24">
			<LandingContainer>
				{/* Section title */}
				<div className="text-center mb-12">
					<LandingSectionHeaderText text="Setup as easy as 1-2-3" extraClasses="text-white" />
				</div>

				<div className="grid md:grid-cols-3 gap-8 md:gap-12">
					{features.map((feature, idx): React.ReactNode => (
						<div key={idx} className="flex flex-col">
							{/* Image */}
							<div className="relative aspect-video rounded-2xl overflow-hidden bg-muted mb-6">
								<img
									src={feature.imagePlaceholder}
									alt={feature.title}
									className="w-full h-full object-cover"
								/>
							</div>

							{/* Title */}
							<h3 className="text-2xl sm:text-3xl font-semibold mb-3 text-white">
								{feature.step}. {feature.title}
							</h3>

							{/* Description */}
							<p className="text-base sm:text-lg text-white/90">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</LandingContainer>
		</section>
	)
}
