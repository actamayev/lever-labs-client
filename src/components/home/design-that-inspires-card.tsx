/* eslint-disable react/no-unescaped-entities */
import { Card } from "@/components/shadcn/ui/card"

export default function DesignThatInspiresCard () {
	return (
		<div className="flex flex-col md:flex-row w-full gap-8 items-center mt-20">
			<div className="w-full md:w-1/2">
				<img
					src="/api/placeholder/800/800"
					alt="Product visualization"
					className="w-full h-auto rounded-lg object-cover"
				/>
			</div>
			<div className="w-full md:w-1/2">
				<Card className="flex flex-col md:flex-row overflow-hidden !bg-white dark:!bg-black shadow-lg relative z-10">
					<div className="flex flex-col p-6 md:w-1/2 md:justify-center space-y-4 bg-white dark:bg-black">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tight">
								Design That Inspires
							</h2>
							<h3 className="text-xl text-muted-foreground">
								Beautifully transparent. Inside and out.
							</h3>
						</div>
						<p className="text-muted-foreground leading-relaxed">
							Pip's clear shell isn't just for show - it's an invitation. See how sensors,
							motors, and circuits work together in perfect harmony. With features like
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
