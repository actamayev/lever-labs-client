/* eslint-disable max-len */
import { IoIosRocket } from "react-icons/io"
import { FaLightbulb } from "react-icons/fa"
import { IconType } from "react-icons"

interface Feature {
  Icon: IconType
  title: string
  subtitle: string
  description: string
  href: StaticPageNames
}

const features: Feature[] = [
	{
		Icon: IoIosRocket,
		title: "Setup",
		subtitle: "Effortless setup. Limitless exploration.",
		description: "Getting started with Pip is as easy as turning it on. No hours of setup. No complicated instructions. Just connect to WiFi, and you're ready to go",
		href: "#",
	},
	{
		Icon: FaLightbulb,
		title: "Growth",
		subtitle: "Grows with you",
		description: "Whether you're exploring robotics for the first time or designing calculus-based control systems, Pip evolves with you. Regularly updated lessons ensure you're always inspired and never out of depth. From elementary school to college and beyond, Pip adapts to your curiosity and ambition.",
		href: "#",
	}
]

function FeatureSection({ feature }: { feature: Feature }) {
	return (
		<div className="flex flex-col space-y-4">
			<div className="flex items-center space-x-2 text-lg">
				<feature.Icon className="h-5 w-5" />
				<span className="font-medium uppercase tracking-wide text-zinc-500">
					{feature.title}
				</span>
			</div>
			<div className="h-px w-12 bg-zinc-200 dark:bg-zinc-800" />
			<h3 className="text-xl font-semibold">{feature.subtitle}</h3>
			<p className="text-zinc-500 dark:text-zinc-400">
				{feature.description}
			</p>
		</div>
	)
}

export function JustKeepBuilding() {
	return (
		<div className="py-24">
			<div className="mb-20">
				<h2 className="text-5xl text-center font-bold">
					Just keep building.
				</h2>
				<p className="mt-4 text-xl text-center text-zinc-500 dark:text-zinc-400">
					Every detail has been crafted for one purpose: to help you just keep building.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto px-6">
				<FeatureSection feature={features[0]} />
				<div className="hidden md:block w-px bg-zinc-200 dark:bg-zinc-800 justify-self-center" />
				<FeatureSection feature={features[1]} />
			</div>
		</div>
	)
}
