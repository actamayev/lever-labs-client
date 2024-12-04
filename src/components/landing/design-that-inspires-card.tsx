/* eslint-disable react/no-unescaped-entities */
import LandingCard from "./landing-card"
import { BoldSpanText } from "./bold-span-text"

export default function DesignThatInspiresCard() {
	return (
		<div className="flex md:flex-row w-full gap-8 items-center">
			<div className="w-1/2">
				<img
					src="pip_right.png"
					alt="Product visualization"
					className="w-full h-auto rounded-lg object-cover"
				/>
			</div>
			<div className="flex items-center w-full md:w-1/2">
				<LandingCard
					title="Design That Inspires"
					subTitle="Beautifully transparent. Inside and out."
					description={
						<>
							Pip's clear shell isn't just for show - it's an invitation.
							See how sensors, circuits, and advanced components work together&nbsp;
							<BoldSpanText>
								in perfect harmony.&nbsp;
							</BoldSpanText>
							With capabilities like distance measurement, gyroscopes, and encoders, Pip sparks curiosity at every turn.
							Built to last, it's ready to tackle anything from classroom chaos to home experiments.
						</>
					}
				/>
			</div>
		</div>
	)
}
