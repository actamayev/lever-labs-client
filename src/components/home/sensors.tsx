import NumberTicker from "../shadcn/ui/number-ticker"


import { FileTextIcon } from "@radix-ui/react-icons"

import { BentoGrid, BentoCard } from "../shadcn/ui/bento-grid"
import { IconType } from "react-icons"

interface SensorsFeatures {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Icon: any
	name: string
	description: string
	className: string
	background: React.ReactNode
}

const features: SensorsFeatures[] = [
	{
		Icon: FileTextIcon,
		name: "RGB",
		description: "We automatically save your files as you type.",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
		className: "row-start-1 col-start-1 col-end-1",
	},
	{
		Icon: FileTextIcon,
		name: "IMU",
		description: "We automatically save your files as you type.",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
		className: "row-start-1 col-start-2 col-end-2",
	},
	{
		Icon: FileTextIcon,
		name: "TOF",
		description: "We automatically save your files as you type.",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
		className: "row-start-1 row-span-2 col-start-3 col-end-3",
	},
	{
		Icon: FileTextIcon,
		name: "Motors",
		description: "We automatically save your files as you type.",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
		className: "row-start-2 col-start-1 col-span-2",
	},
	{
		Icon: FileTextIcon,
		name: "TOF",
		description: "We automatically save your files as you type.",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
		className: "row-start-1 row-span-2 col-start-3 col-end-3",
	},
	{
		Icon: FileTextIcon,
		name: "TOF",
		description: "We automatically save your files as you type.",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
		className: "row-start-1 row-span-2 col-start-3 col-end-3",
	},
	{
		Icon: FileTextIcon,
		name: "Buttons",
		description: "We automatically save your files as you type.",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
		className: "row-start-3 row-span-1 col-start-1 col-span-1",
	},
	{
		Icon: FileTextIcon,
		name: "Module",
		description: "We automatically save your files as you type.",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
		className: "row-start-3 row-span-1 col-start-2 col-span-2",
	},
]

export function BentoDemo() {
	return (
		<BentoGrid className="lg:grid-rows-3">
			{features.map((feature) => (
				<BentoCard key={feature.name} {...feature} />
			))}
		</BentoGrid>
	)
}

export default function Sensors() {
	return (
		<div className="mt-10">
			<p className="flex justify-center text-center whitespace-pre-wrap text-6xl
			font-medium tracking-tight text-black dark:text-white mb-10">
				Pip comes with <NumberTicker value={10} /> onboard sensors.
			</p>
			<div className="flex">
				<BentoDemo />
			</div>
		</div>
	)
}
