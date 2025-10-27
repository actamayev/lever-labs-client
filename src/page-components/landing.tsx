"use client"

import { observer } from "mobx-react"
import LandingNavigation from "../components/landing/landing-navigation"
import LandingHero from "../components/landing/landing-hero"
import PlatformSection from "../components/landing/platform-section"
import SimpleFeaturesSection from "../components/landing/simple-features-section"
import TestimonialsSection from "../components/landing/testimonials-section"
import FeaturesSection from "../components/landing/features-section"

function Landing(): React.ReactNode {
	return (
		<>
			<LandingNavigation />
			<LandingHero />
			<PlatformSection />
			<SimpleFeaturesSection />
			<TestimonialsSection />
			<FeaturesSection />
		</>
	)
}

export default observer(Landing)
