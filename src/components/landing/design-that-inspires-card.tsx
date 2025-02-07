/* eslint-disable react/no-unescaped-entities */
import LandingCard from "./landing-card"
import { BoldSpanText } from "../bold-span-text"

export default function DesignThatInspiresCard() {
	return (
	// Change to column on mobile, row on md+ screens
		<div className="flex flex-col md:flex-row w-full gap-8 items-center">
			{/* Card comes first on mobile */}
			<div className="w-full md:w-1/2 order-1 md:order-2">
				<LandingCard
					title="Design That Inspires"
					subTitle="Beautifully transparent. Inside and out."
					description={
						<>
                            Pip's clear shell isn't just for show - it's an invitation.
                            See how sensors, circuits, and advanced components work together
							<BoldSpanText>
                                in perfect harmony.
							</BoldSpanText>
                            With capabilities like distance measurement, gyroscopes, and encoders, Pip sparks curiosity at every turn.
                            Built to last, it's ready to tackle anything from classroom chaos to home experiments.
						</>
					}
				/>
			</div>
			{/* Image appears below on mobile */}
			<div className="w-full md:w-1/2 order-2 md:order-1">
				<img
					src="pip_right.png"
					alt="Product visualization"
					className="w-full h-auto rounded-lg object-cover"
					loading="lazy"
				/>
			</div>
		</div>
	)
}
