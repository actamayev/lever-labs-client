import { IconType } from "react-icons"
import { GiCarWheel } from "react-icons/gi"
import { TbRulerMeasure } from "react-icons/tb"
import { RiRadioButtonFill } from "react-icons/ri"
import { FaInfinity, FaLightbulb, FaTachometerAlt } from "react-icons/fa"
import NumberTicker from "../shadcn/ui/number-ticker"
import { BentoGrid, BentoCard } from "../shadcn/ui/bento-grid"

interface SensorsFeatures {
	Icon: IconType
	name: string
	description: string
	className: string
	background: React.ReactNode
}

const features: SensorsFeatures[] = [
	{
		// TODO: When pressed, should change color. should start as black/white, but then be random
		Icon: FaLightbulb,
		name: "RGB LEDs",
		description: "We automatically save your files as you type.",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
		className: "row-start-1 col-start-1 col-end-1",
	},
	{
		Icon: FaTachometerAlt,
		name: "IMU",
		description: "We automatically save your files as you type.",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
		className: "row-start-1 col-start-2 col-end-2",
	},
	{
		Icon: TbRulerMeasure,
		name: "TOF",
		description: "We automatically save your files as you type.",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
		className: "row-start-1 row-span-2 col-start-3 col-end-3",
	},
	{
		Icon: GiCarWheel,
		name: "2 Motors + Encoders",
		description: "We automatically save your files as you type.",
		background: <img src="wheels_encoders.png" className="absolute -right-20 -top-20 opacity-60" />,
		className: "row-start-2 col-start-1 col-span-2",
	},
	{
		Icon: RiRadioButtonFill,
		name: "Buttons",
		description: "We automatically save your files as you type.",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
		className: "row-start-3 row-span-1 col-start-1 col-span-1",
	},
	{
		Icon: FaInfinity,
		name: "Module",
		description: "We automatically save your files as you type.",
		background: <img className="absolute -right-20 -top-20 opacity-60" />,
		className: "row-start-3 row-span-1 col-start-2 col-span-2",
	}
]

export default function Sensors() {
	return (
		<div className="mt-10">
			<p className="flex justify-center text-center whitespace-pre-wrap text-6xl
			font-medium tracking-tight text-black dark:text-white mb-10">
				Pip comes with <NumberTicker value={10} /> onboard sensors.
			</p>
			<div className="flex">
				<BentoGrid className="lg:grid-rows-3">
					{features.map((feature) => (
						<BentoCard key={feature.name} {...feature} />
					))}
				</BentoGrid>
			</div>
		</div>
	)
}
