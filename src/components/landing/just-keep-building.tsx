import { LucideIcon } from "lucide-react"
import BoxReveal from "../shadcn/ui/box-reveal"
import { BoldedDescription } from "../bold-span-text"
import TextRevealByWord from "../shadcn/ui/text-reveal"
import { GrowingTree } from "./growing-tree"
import { RocketLiftoff } from "./rocket-liftoff"

interface Feature {
	Icon: LucideIcon
	title: string
}

const features: Feature[] = [
	{
		Icon: RocketLiftoff,
		title: "Frictionless"
	},
	{
		Icon: GrowingTree,
		title: "Grows With You"
	}
]

function FeatureSectionHeader({ feature }: { feature: Feature }) {
	return (
		<BoxReveal boxColor={"#003da5"} duration={0.25}>
			<div className="flex items-center space-x-2 text-lg text-gray-900 dark:text-gray-100">
				<feature.Icon size={35} />
				<span className="font-semibold tracking-wide text-2xl lg:text-4xl">
					{feature.title}
				</span>
			</div>
		</BoxReveal>
	)
}

function FrictionlessDescription() {
	return (
		<BoxReveal boxColor={"#003da5"} duration={0.65}>
			<p className="text-lg lg:text-2xl mt-4 lg:mt-8">
				<span className="text-gray-500 dark:text-gray-400">
                    Getting started with Pip is as easy as turning it on. No hours of setup. No complicated instructions.
				</span>
				<BoldedDescription extraClasses="text-lg lg:text-2xl">
                    Just connect to Wi-Fi, and you're ready to go.
				</BoldedDescription>
			</p>
		</BoxReveal>
	)
}

function GrowsWithYouDescription() {
	return (
		<BoxReveal boxColor={"#003da5"} duration={0.65}>
			<p className="text-lg lg:text-2xl mt-4 lg:mt-8">
				<span className="text-gray-500 dark:text-gray-400">
                    Whether you're exploring robotics for the first time or you're a seasoned veteran,
				</span>
				<BoldedDescription extraClasses="text-lg lg:text-2xl">
                    Pip evolves with you.
				</BoldedDescription>
				<span className="text-gray-500 dark:text-gray-400">
                    Regularly updated lessons ensure you're always inspired with new horizons to explore.
                    From elementary school to college and beyond:
				</span>
				<BoldedDescription extraClasses="text-lg lg:text-2xl">
                    Pip is one robot that does it all.
				</BoldedDescription>
			</p>
		</BoxReveal>
	)
}

export default function JustKeepBuilding() {
	return (
		<div id="just-keep-building">
			<div className="mb-12 lg:mb-20 text-center">
				<p className="text-xl lg:text-4xl text-gray-600 dark:text-gray-300 mb-4 lg:mb-8">
                    Every detail has been crafted for one purpose: to let you
				</p>
				<TextRevealByWord text="just keep building" wordClasses="text-5xl !md:text-2xl lg:text-8xl" />
			</div>

			{/* Mobile: Stack vertically, Desktop: Side by side */}
			<div className="mx-auto flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-0">
				{/* First Column */}
				<div className="flex-1">
					<FeatureSectionHeader feature={features[0]} />
					<FrictionlessDescription />
				</div>

				{/* Divider - Only show on desktop */}
				<div className="hidden lg:block mx-16 h-full border-l border-dashed border-gray-200 dark:border-gray-800 self-stretch" />

				{/* Second Column */}
				<div className="flex-1">
					<FeatureSectionHeader feature={features[1]} />
					<GrowsWithYouDescription />
				</div>
			</div>
		</div>
	)
}
