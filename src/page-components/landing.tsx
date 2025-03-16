"use client"

import { observer } from "mobx-react"
import GridPattern from "../components/shadcn/ui/grid-pattern"
import LandingHeader from "../components/landing/landing-header"
import TheLittleThings from "../components/landing/the-little-things"
import ByBuildersForBuilders from "../components/landing/by-builders-for-builders"
import SignUpForUpdates from "../components/landing/sign-up-for-updates"
import SmallRobotBigPossibilities from "../components/landing/small-robot-big-possibilities"
import useRedirectKnownUserToLab from "../hooks/redirects/redirect-known-user-from-landing-to-lab"
import TheLabLanding from "../components/landing/the-lab-landing"
import LearnByDoing from "../components/landing/learn-by-doing"
import LandingSensors from "../components/landing/sensors/landing-sensors"
import AllAgesWelcome from "../components/landing/all-ages-welcome"
// import CodeThatComesAlive from "../components/landing/code-that-comes-alive"
import DesignedForClassroom from "../components/landing/designed-for-classroom"
import SimpleSetup from "../components/landing/simple-setup"
import BridgingTwoWorlds from "../components/landing/bridging-two-worlds"
import LandingSectionContainer from "../components/landing/landing-section-container"

// 2/15/25 TODO: Make the landing page px-4 for mobile
function Landing() {
	useRedirectKnownUserToLab()
	return (
		<>
			<div className="min-h-screen w-full relative">
				<div className="fixed inset-0">
					<GridPattern />
				</div>

				<LandingSectionContainer>
					<LandingHeader />
				</LandingSectionContainer>

				<LandingSectionContainer>
					<SmallRobotBigPossibilities />
				</LandingSectionContainer>

				<LandingSectionContainer>
					<TheLabLanding />
				</LandingSectionContainer>

				<LandingSectionContainer>
					<LearnByDoing />
				</LandingSectionContainer>

				<LandingSectionContainer>
					<LandingSensors />
				</LandingSectionContainer>

				<LandingSectionContainer>
					<AllAgesWelcome />
				</LandingSectionContainer>

				{/* <LandingSectionContainer>
					<CodeThatComesAlive />
				</LandingSectionContainer> */}

				<LandingSectionContainer>
					<DesignedForClassroom />
				</LandingSectionContainer>

				<LandingSectionContainer>
					<SimpleSetup />
				</LandingSectionContainer>

				<LandingSectionContainer extraClasses="bg-pipTheme py-16 sm:py-20 md:py-24 lg:py-32 mt-8 sm:mt-10 md:mt-12">
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
				</LandingSectionContainer>
			</div>
		</>
	)
}

export default observer(Landing)
