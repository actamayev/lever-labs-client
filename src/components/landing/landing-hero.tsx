"use client"

import HeroBackground from "./hero-background"
import LandingNavigation from "./landing-navigation"
import HeroContent from "./hero-content"

export default function LandingHero(): React.ReactNode {
	return (
		<div className="relative overflow-hidden h-dvh">
			{/* Background images */}
			<HeroBackground />

			{/* Content wrapper */}
			<div className="h-full mx-auto pb-24 z-10 relative">
				{/* Navigation */}
				<div className="px-8 md:px-20 xl:px-32 max-w-9xl xs:pt-4 mx-auto">
					<LandingNavigation />
				</div>

				{/* Hero text */}
				<HeroContent />
			</div>
		</div>
	)
}
