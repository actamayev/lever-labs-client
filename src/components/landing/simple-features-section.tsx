"use client"

import LandingContainer from "./landing-container"

interface Feature {
	title: string
	description: string
	imagePlaceholder: string
}

const features: Feature[] = [
	{
		title: "Simple setup",
		description: "Pip works right out the box - no assembly required!",
		imagePlaceholder: "/placeholder-setup.jpg"
	},
	{
		title: "Quick connection",
		description: "Connect Pip to your Wi-Fi in a process that takes less than a minute. Drive around, and send code instructions.",
		imagePlaceholder: "/placeholder-connection.jpg"
	}
]

export default function SimpleFeaturesSection(): React.ReactNode {
	return (
		<section className="bg-lever-blue py-16 md:py-24">
			<LandingContainer>
				<div className="grid md:grid-cols-2 gap-8 md:gap-12">
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
								{feature.title}
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
