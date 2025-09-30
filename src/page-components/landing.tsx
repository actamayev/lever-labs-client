"use client"

import { observer } from "mobx-react"
import LandingHero from "../components/landing/landing-hero"
import TheLittleThings from "../components/landing/the-little-things"
import ByBuildersForBuilders from "../components/landing/by-builders-for-builders"
import SignUpForUpdates from "../components/landing/sign-up-for-updates"
import SmallRobotBigPossibilities from "../components/landing/small-robot-big-possibilities"
import CareerQuestLanding from "../components/landing/career-quest-landing"
import LearnByDoing from "../components/landing/learn-by-doing"
import LandingSensors from "../components/landing/sensors/landing-sensors"
import AllAgesWelcome from "../components/landing/all-ages-welcome"
// import CodeThatComesAlive from "../components/landing/code-that-comes-alive"
import SimpleSetup from "../components/landing/simple-setup"
import BridgingTwoWorlds from "../components/landing/bridging-two-worlds"
import LandingSectionContainer from "../components/landing/landing-section-container"

function Landing(): React.ReactNode {
	return (
		<>
			<LandingHero />

			{/* <LandingSectionContainer>
				<SmallRobotBigPossibilities />
			</LandingSectionContainer>

			<LandingSectionContainer>
				<CareerQuestLanding />
			</LandingSectionContainer>

			<LandingSectionContainer>
				<LearnByDoing />
			</LandingSectionContainer>

			<LandingSectionContainer>
				<LandingSensors />
			</LandingSectionContainer>

			<LandingSectionContainer>
				<AllAgesWelcome />
			</LandingSectionContainer> */}

			{/* <LandingSectionContainer>
					<CodeThatComesAlive />
				</LandingSectionContainer> */}

			{/* <LandingSectionContainer>
				<SimpleSetup />
			</LandingSectionContainer>

			<LandingSectionContainer extraClasses="bg-humpback py-16 sm:py-20 md:py-24 lg:py-32 mt-8 sm:mt-10 md:mt-12">
				<TheLittleThings />
			</LandingSectionContainer>

			<LandingSectionContainer>
				<BridgingTwoWorlds />
			</LandingSectionContainer>

			<LandingSectionContainer>
				<ByBuildersForBuilders />
			</LandingSectionContainer>

			<LandingSectionContainer extraClasses="flex relative items-center justify-center pb-16 text-questionText">
				<SignUpForUpdates />
			</LandingSectionContainer> */}
		</>
	)
}

export default observer(Landing)
