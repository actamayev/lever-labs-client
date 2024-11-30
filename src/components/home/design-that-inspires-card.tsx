/* eslint-disable react/no-unescaped-entities */
import { Card } from "@/components/shadcn/ui/card"

export default function DesignThatInspiresCard() {
	return (
		<div className="flex md:flex-row w-full gap-8 items-center mt-20">
			<div className="w-1/2">
				<img
					src="https://placehold.co/600x400"
					alt="Product visualization"
					className="w-full h-auto rounded-lg object-cover"
				/>
			</div>
			<div className="w-full md:w-1/2 h-full">
				<Card
					className="flex flex-col overflow-hidden !bg-white dark:!bg-black shadow-lg relative z-10"
					style={{ height: "400px" }}
				>
					<div className="flex flex-col p-6 w-full h-full justify-between">
						<div className="space-y-6">
							<h2 className="text-4xl font-bold">
								Design That Inspires
							</h2>
							<h3 className="text-2xl text-zinc-700 dark:text-zinc-300">
								Beautifully transparent. Inside and out.
							</h3>
						</div>
						<p className="text-zinc-600 dark:text-zinc-400 text-lg">
							Pip's clear shell isn't just for show - it's an invitation. See how sensors,
							motors, and circuits work together&nbsp;
							<span className="text-black dark:text-white">
								in perfect harmony.&nbsp;
							</span>
							With features like
							distance sensors, gyroscopes, and encoders, Pip sparks curiosity at every
							turn. And it's built to last, ready to tackle anything from classroom chaos
							to home experiments.
						</p>
					</div>
				</Card>
			</div>
		</div>
	)
}
