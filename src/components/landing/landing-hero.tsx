"use client"

import HeroBackground from "./hero-background"
import HeroContent from "./hero-content"

export default function LandingHero(): React.ReactNode {
	return (
		<div className="relative overflow-hidden h-dvh">
			{/* Background images */}
			<HeroBackground />

			{/* Content wrapper */}
			<div className="h-full pb-24 z-10 relative">
				{/* Hero text */}
				<HeroContent />
			</div>
		</div>
	)
}
