/* eslint-disable max-len */
import { GiBrickWall } from "react-icons/gi"
import { IoMdBatteryCharging } from "react-icons/io"
import { StickyScroll } from "../aceternity/sticky-scroll-reveal"

export default function Features() {
	return (
		<div className="w-full">
			<StickyScroll content={content} />
		</div>
	)
}

const content = [
	{
		title: "Just keep building",
		description: "Pip is efficient. Up to 2 hours of continuous use, with 30 minute charge times",
		content: (
			<div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
				<IoMdBatteryCharging size={100}/>
			</div>
		),
	},
	{
		title: "Built to last",
		description: "Talk about the durability",
		content: (
			<div className="h-full w-full flex items-center justify-center text-white">
				<GiBrickWall size={100}/>
			</div>
		),
	},
	{
		title: "We need another section",
		description: "We need another section + description",
		content: (
			<div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
				Other section icon
			</div>
		),
	}
]
