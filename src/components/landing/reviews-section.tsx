/* eslint-disable max-len */
"use client"

import LandingContainer from "./landing-container"
import TestimonialsComponent, { type TestimonialItem } from "@/components/ui/testimonials-component"

const testimonials: TestimonialItem[] = [
	{
		name: "Craig",
		role: "Parent who finally found screen time he approves of",
		avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png?width=40&height=40&format=auto",
		rating: 5,
		content: "Jamie was skeptical about coding at first, but Pip made it click. Now he's programming light shows and racing Pip around the house!"
	},
	{
		name: "Martin",
		role: "Proud parent of a future engineer",
		avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png?width=40&height=40&format=auto",
		rating: 5,
		content: "Chris spends hours with Pip and doesn't even realize he's learning. The setup was seamless - he was coding within minutes."
	},
	{
		name: "Sarah",
		role: "Mom of the neighborhood's coolest kid",
		avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png?width=40&height=40&format=auto",
		rating: 5,
		content: "I bought Pip for my daughter Alex, and now all her friends want one! It's brought coding from abstract concepts to something she can see and touch."
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

				<TestimonialsComponent testimonials={testimonials} />
			</LandingContainer>
		</section>
	)
}
