/* eslint-disable max-len */
import { IoIosRocket } from "react-icons/io"
import { BentoCard, BentoGrid } from "../shadcn/ui/bento-grid"
import { FaHammer } from "react-icons/fa"

const features = [
	{
		Icon: IoIosRocket,
		name: "Efortless setup. Limitless expoloration",
		description: "Getting started with Pip is as easy as turning it on. No hours of setup. No complicated instructions. Just connect to WiFi, and you’re ready to go. Every detail has been crafted for one purpose: to help you just keep building.",
		href: "#",
		// cta: "Learn more",
		className: "col-span-2",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
	},
	{
		Icon: FaHammer,
		name: "Built by engineers, for future engineers",
		description: "We know getting started robotics can appear tough and feel daunting. We've been there...",
		href: "#",
		// cta: "Learn more",
		className: "col-span-2",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
	}
]

export function Frictionless() {
	return (
		<>
			<div className="text-4xl text-center">
				Frictionless
			</div>
			<BentoGrid>
				{features.map((feature, idx) => (
					<BentoCard key={idx} {...feature} />
				))}
			</BentoGrid>
		</>
	)
}
