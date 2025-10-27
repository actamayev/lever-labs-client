/* eslint-disable max-len */
"use client"

import LandingContainer from "./landing-container"
import TestimonialsComponent, { type TestimonialItem } from "@/components/ui/testimonials-component"
import LandingSectionHeaderText from "./landing-section-header-text"

const stats = [
	{
		stat: "95% of parents",
		description: "recommend for kids interested in STEM"
	},
	{
		stat: "88% of users",
		description: "Improve their critical thinking skills"
	},
	{
		stat: "100% of kids",
		description: "Have fun"
	}
]

const testimonials: TestimonialItem[] = [
	{
		name: "Craig",
		role: "Proud parent of a future engineer",
		avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png?width=40&height=40&format=auto",
		rating: 5,
		content: "Jamie was skeptical about coding at first, but Pip made it click. Now he's programming light shows and racing Pip around the house!"
	},
	{
		name: "Martin",
		role: "Parent who finally found screen time he approves of",
		avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png?width=40&height=40&format=auto",
		rating: 5,
		content: "Chris spends hours with Pip and doesn't even realize he's learning. The setup was so easy - within minutes, he was coding his first program."
	},
	{
		name: "Sarah",
		role: "Mom of the neighborhood's coolest kid",
		avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png?width=40&height=40&format=auto",
		rating: 5,
		content: "I bought Pip for my daughter Alex, and now all her friends want one! It's brought coding from abstract concepts to something they can see and touch."
	},
	{
		name: "Zach",
		role: "Dad desperately trying to keep up with his kid",
		avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png?width=40&height=40&format=auto",
		rating: 4,
		content: "Max went from drag-and-drop blocks to writing real code in weeks. The AI assistance is perfect for when I'm not around to help."
	}
]

export default function TestimonialsSection(): React.ReactNode {
	return (
		<section className="bg-polar">
			<LandingContainer>
				{/* Section title */}
				<div className="text-center mb-12">
					<LandingSectionHeaderText text="Don't take our word for it" />
				</div>

				{/* Stats section */}
				<div className="bg-swan rounded-3xl p-8 md:p-12">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-hare">
						{stats.map((item, idx): React.ReactNode => (
							<div key={idx} className="flex flex-col items-center justify-center text-center px-4 md:px-8">
								<div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
									{item.stat}
								</div>
								<p className="text-base sm:text-lg text-foreground/80">
									{item.description}
								</p>
							</div>
						))}
					</div>
				</div>

				<TestimonialsComponent testimonials={testimonials} />
			</LandingContainer>
		</section>
	)
}
