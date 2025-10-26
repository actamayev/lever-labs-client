"use client"

import { observer } from "mobx-react"
import LandingHero from "../components/landing/landing-hero"

function Landing(): React.ReactNode {
	return (
		<>
			<LandingHero />
		</>
	)
}

export default observer(Landing)
