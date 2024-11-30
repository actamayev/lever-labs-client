/* eslint-disable react/no-unescaped-entities */
import { FaHammer } from "react-icons/fa"
import BlueDot from "./blue-dot"
import { BoldedDescription } from "./just-keep-building"

export default function WhoWeAre() {
	return (
		<div className="flex items-start mt-20">
			<div className="flex-1">
				<BlueDot />
			</div>
			<div className="mx-16 h-full border-l border-dashed border-zinc-200 dark:border-zinc-800 self-stretch" />
			<div className="flex-1">
				<div className="flex items-center space-x-2 text-lg text-zinc-900 dark:text-zinc-100">
					<FaHammer size={35} />
					<span className="font-medium tracking-wide text-4xl">
						Blue Dot Robots
					</span>
				</div>
				<h3 className="text-3xl font-light my-6 text-zinc-800 dark:text-zinc-200">
					Built by engineers, for future engineers
				</h3>
				<p className="text-2xl">
					<div className="text-zinc-500 dark:text-zinc-400">
						We know getting started robotics can appear tough and feel daunting. We've been there...
					</div>
					<div className="text-zinc-500 dark:text-zinc-400">
						We designed Pip to make learning robotics&nbsp;
						<BoldedDescription>seamless and exciting.</BoldedDescription>
					</div>
				</p>
			</div>
		</div>
	)
}
