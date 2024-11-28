/* eslint-disable react/no-unescaped-entities */
import { Card } from "@/components/shadcn/ui/card"

export default function DesignThatInspiresCard () {
	return (
		<Card className="flex flex-col md:flex-row overflow-hidden bg-white mt-4">
			{/* Image container with fixed height and responsive width */}
			<div className="relative h-64 md:h-auto md:w-1/2">
				<img
					src="/api/placeholder/800/600"
					alt="Product visualization"
					className="object-cover w-full h-full"
				/>
			</div>

			{/* Text content container */}
			<div className="flex flex-col p-6 md:w-1/2 md:justify-center space-y-4">
				<div className="space-y-2">
					<h2 className="text-3xl font-bold tracking-tight">
            Design That Inspires
					</h2>
					<h3 className="text-xl text-muted-foreground">
            A beautifully transparent way to learn, build, and create
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
	)
}
