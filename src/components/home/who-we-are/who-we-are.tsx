import BlueDot from "./blue-dot"
import { BoldedDescription } from "../bold-span-text"

export default function WhoWeAre() {
	return (
		<div className="relative flex items-start mt-20 z-10">
			<div className="flex-1">
				<BlueDot />
			</div>
			<div className="mx-16 h-full border-l border-dashed border-zinc-200 dark:border-zinc-800 self-stretch" />
			<div className="flex-1">
				<div className="flex items-center space-x-2 text-lg text-zinc-900 dark:text-zinc-100">
					<span className="font-medium tracking-wide text-6xl my-6">
						Built by engineers,
						<div>for future engineers</div>
					</span>
				</div>
				<div className="text-3xl">
					<div className="text-zinc-500 dark:text-zinc-400">
						We know getting started robotics can appear tough and feel daunting. We&apos;ve been there...
					</div>
					<br />
					<div className="text-zinc-500 dark:text-zinc-400">
						We designed Pip to make learning robotics&nbsp;
						<div>
							<BoldedDescription extraClasses="text-3xl">
								fun and seamless.
							</BoldedDescription>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
