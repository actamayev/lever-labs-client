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
		title: "Unbox and go",
		description: "No assembly, no complicated instructions. Just open the box and you're ready to start.",
		imagePlaceholder: "/images/career-quest/meet-pip/s1_p1.png"
	},
	{
		step: "2",
		title: "Connect to Wi-Fi",
		description: "Plug Pip into your computer and connect to Wi-Fi. The whole process takes less than a minute.",
		imagePlaceholder: "/images/career-quest/meet-pip/s1_p5_1.png"
	},
	{
		step: "3",
		title: "Start learning",
		description: "That's it! Now you can control and code Pip completely wirelessly from anywhere.",
		imagePlaceholder: "/images/career-quest/meet-pip/s1_p3.jpeg"
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
