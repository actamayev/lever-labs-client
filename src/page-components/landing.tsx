"use client"

import { observer } from "mobx-react"
import LandingNavigation from "../components/landing/landing-navigation"
import LandingHero from "../components/landing/landing-hero"
import PlatformSection from "../components/landing/platform-section"

function Landing(): React.ReactNode {
	return (
		<>
			<LandingNavigation />
			<LandingHero />
			<PlatformSection />
		</>
	)
}

export default observer(Landing)
