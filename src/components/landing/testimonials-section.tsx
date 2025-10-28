"use client"

import LandingContainer from "./landing-container"
import LandingSectionHeaderText from "./landing-section-header-text"

const stats = [
	{
		stat: "89% of parents",
		description: "say their kids gained confidence in STEM"
	},
	{
		stat: "96% of kids",
		description: "say Pip makes learning fun"
	},
	{
		stat: "9 out of 10 parents",
		description: "recommend Pip to other families"
	}
]

export default function TestimonialsSection(): React.ReactNode {
	return (
		<section className="bg-polar pb-16 md:pb-24">
			<LandingContainer>
				{/* Section title */}
				<div className="text-center mb-12">
					<LandingSectionHeaderText text="Don't take our word for it" />
				</div>

				{/* Stats section */}
				<div className="bg-humpback/20 rounded-3xl p-8 md:p-12">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-hare">
						{stats.map((item, idx): React.ReactNode => (
							<div key={idx} className="flex flex-col items-center justify-center text-center px-4 py-6 md:py-0 md:px-8">
								<div className="text-3xl font-bold mb-3">
									{item.stat}
								</div>
								<p className="text-base sm:text-lg text-foreground/80">
									{item.description}
								</p>
							</div>
						))}
					</div>
				</div>

			</LandingContainer>
		</section>
	)
}
