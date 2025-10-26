"use client"

import HeroBackground from "./hero-background"
import LandingNavigation from "./landing-navigation"
import HeroContent from "./hero-content"
import LandingContainer from "./landing-container"

export default function LandingHero(): React.ReactNode {
	return (
		<div className="relative overflow-hidden h-dvh">
			{/* Background images */}
			<HeroBackground />

			{/* Content wrapper */}
			<div className="h-full pb-24 z-10 relative">
				{/* Navigation */}
				<LandingContainer className="xs:pt-4">
					<LandingNavigation />
				</LandingContainer>

				{/* Hero text */}
				<HeroContent />
			</div>
		</div>
	)
}
