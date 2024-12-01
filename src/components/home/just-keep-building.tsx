/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import { IconType } from "react-icons"
import { IoIosRocket } from "react-icons/io"
import { FaLightbulb } from "react-icons/fa"
import BoxReveal from "../shadcn/ui/box-reveal"
import TextRevealByWord from "../shadcn/ui/text-reveal"
import { BoldedDescription } from "./bold-span-text"

interface Feature {
	Icon: IconType
	title: string
	subtitle: string
}

const features: Feature[] = [
	{
		Icon: IoIosRocket,
		title: "Frictionless",
		subtitle: "Effortless setup. Limitless exploration.",
	},
	{
		Icon: FaLightbulb,
		title: "Grows With You",
		subtitle: "Perfect for beginners. Essential for experts.",
	}
]

function FeatureSectionHeader({ feature }: { feature: Feature }) {
	return (
		<>
			<BoxReveal boxColor={"#003da5"} duration={0.25}>
				<div className="flex items-center space-x-2 text-lg text-zinc-900 dark:text-zinc-100">
					<feature.Icon size={35} />
					<span className="font-medium tracking-wide text-4xl">
						{feature.title}
					</span>
				</div>
			</BoxReveal>
			<BoxReveal boxColor={"#003da5"} duration={0.45}>
				<h3 className="text-3xl font-light my-6 text-zinc-800 dark:text-zinc-200">{feature.subtitle}</h3>
			</BoxReveal>
		</>
	)
}


function FrictionlessDescription() {
	return (
		<BoxReveal boxColor={"#003da5"} duration={0.65}>
			<p className="text-2xl">
				<span className="text-zinc-500 dark:text-zinc-400">
					Getting started with Pip is as easy as turning it on. No hours of setup. No complicated instructions.&nbsp;
				</span>
				<BoldedDescription>
					Just connect to Wi-Fi, and you're ready to go.
				</BoldedDescription>
			</p>
		</BoxReveal>
	)
}

function GrowsWithYouDescription() {
	return (
		<BoxReveal boxColor={"#003da5"} duration={0.65}>
			<p className="text-2xl">
				<span className="text-zinc-500 dark:text-zinc-400 text-2xl">
					Whether you're exploring robotics for the first time or designing calculus-based control systems,&nbsp;
				</span>
				<BoldedDescription>Pip evolves with you.&nbsp;</BoldedDescription>
				<span className="text-zinc-500 dark:text-zinc-400 text-2xl">
					Regularly updated lessons ensure you're always inspired and never out of depth. From elementary school to college and beyond:&nbsp;
				</span>
				<BoldedDescription>Pip is one robot that does it all.</BoldedDescription>
			</p>
		</BoxReveal>
	)
}

export function JustKeepBuilding() {
	return (
		<div>
			<div className="mb-24 text-center text-4xl">
				<p className="my-8 text-zinc-600 dark:text-zinc-300">
					Every detail has been crafted for one purpose: to let you
				</p>
				<TextRevealByWord
					text="just keep building"
					className=""
					instantTransition
				/>
			</div>
			<div className="mx-auto flex items-start">
				<div className="flex-1">
					<FeatureSectionHeader feature={features[0]} />
					<FrictionlessDescription />
				</div>
				<div className="mx-16 h-full border-l border-dashed border-zinc-200 dark:border-zinc-800 self-stretch" />
				<div className="flex-1">
					<FeatureSectionHeader feature={features[1]} />
					<GrowsWithYouDescription />
				</div>
			</div>
		</div>
	)
}
