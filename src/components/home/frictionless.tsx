/* eslint-disable max-len */
import { IoIosRocket } from "react-icons/io"
import { FaLightbulb } from "react-icons/fa"
import { BentoCard, BentoGrid } from "../shadcn/ui/custom-bento-grid"

// TODO: Bold just keep building
const features = [
	{
		Icon: IoIosRocket,
		name: "Effortless setup. Limitless exploration.",
		description: "Getting started with Pip is as easy as turning it on. No hours of setup. No complicated instructions. Just connect to WiFi, and you're ready to go. Every detail has been crafted for one purpose: to help you just keep building.",
		href: "#",
		// cta: "Learn more",
		className: "col-span-2",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
	},
	{
		Icon: FaLightbulb,
		name: "Grows with you",
		// TODO: Rephrase the experts part
		description: "Whether you're exploring robotics for the first time or designing calculus-based control systems, Pip evolves with you. Regularly updated lessons ensure you’re always inspired and never out of depth. From elementary school to college and beyond, Pip adapts to your curiosity and ambition.",
		href: "#",
		// cta: "Learn more",
		className: "col-span-2",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
	}
]

export function Frictionless() {
	return (
		<div className="">
			<div className="text-4xl text-center mb-8">
				Just keep building.
			</div>
			<BentoGrid>
				{features.map((feature, idx) => (
					<BentoCard key={idx} {...feature} />
				))}
			</BentoGrid>
		</div>
	)
}
