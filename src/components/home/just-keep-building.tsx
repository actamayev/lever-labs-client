/* eslint-disable max-len */
import { IconType } from "react-icons"
import { IoIosRocket } from "react-icons/io"
import { FaLightbulb } from "react-icons/fa"

interface Feature {
	Icon: IconType
	title: string
	subtitle: string
	description: string
}

const features: Feature[] = [
	{
		Icon: IoIosRocket,
		title: "Frictionless",
		subtitle: "Effortless setup. Limitless exploration.",
		description: "Getting started with Pip is as easy as turning it on. No hours of setup. No complicated instructions. Just connect to WiFi, and you're ready to go",
	},
	{
		Icon: FaLightbulb,
		title: "Grows With You",
		subtitle: "Perfect for beginners. Essential for experts",
		description: "Whether you're exploring robotics for the first time or designing calculus-based control systems, Pip evolves with you. Regularly updated lessons ensure you're always inspired and never out of depth. From elementary school to college and beyond, Pip adapts to your curiosity and ambition.",
	}
]

function FeatureSection({ feature }: { feature: Feature }) {
	return (
		<div className="flex-1">
			<div className="flex items-center space-x-2 text-lg">
				<feature.Icon size={30} />
				<span className="font-medium tracking-wide text-zinc-800 text-4xl">
					{feature.title}
				</span>
			</div>
			<div className="h-px w-full  my-4" />
			<h3 className="text-3xl font-light mb-4">{feature.subtitle}</h3>
			<p className="text-zinc-500 dark:text-zinc-400 text-2xl">
				{feature.description}
			</p>
		</div>
	)
}

export function JustKeepBuilding() {
	return (
		<div className="py-24">
			<div className="mb-20">
				<h2 className="text-5xl text-center font-extralight">
					Just keep building.
				</h2>
				<p className="mt-4 text-xl text-center text-zinc-600 dark:text-zinc-400">
					Every detail has been crafted for one purpose: to help you&nbsp;
					<span className="font-bold">just keep building.</span>
				</p>
			</div>

			<div className="max-w-6xl mx-auto flex items-start">
				<FeatureSection feature={features[0]} />
				<div className="mx-16 w-px h-full bg-zinc-200 dark:bg-zinc-800 self-stretch" />
				<FeatureSection feature={features[1]} />
			</div>
		</div>
	)
}
