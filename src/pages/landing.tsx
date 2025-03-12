/* eslint-disable @typescript-eslint/naming-convention */
import PageHelmet from "../components/helmet/page-helmet"
import GridPattern from "../components/shadcn/ui/grid-pattern"
import LandingHeader from "../components/landing/landing-header"
import TheLittleThings from "../components/landing/the-little-things"
import WhoWeAre from "../components/landing/who-we-are"
import SignUpForUpdates from "../components/landing/sign-up-for-updates"
import SmallRobotBigPossibilities from "../components/landing/small-robot-big-possibilities"
import useRedirectKnownUserToLab from "../hooks/redirects/redirect-known-user-from-landing-to-lab"
import TheLabLanding from "../components/landing/the-lab-landing"
import LearnByDoing from "../components/landing/learn-by-doing"
import LandingSensors from "../components/landing/sensors/landing-sensors"
import AllAgesWelcome from "../components/landing/all-ages-welcome"
import CodeThatComesAlive from "../components/landing/code-that-comes-alive"
import DesignedForClassroom from "../components/landing/designed-for-classroom"
import SimpleSetup from "../components/landing/simple-setup"
import BridgingTwoWorlds from "../components/landing/bridging-two-worlds"
import LandingSectionContainer from "../components/landing/landing-section-container"

// 2/15/25 TODO: Make the landing page px-4 for mobile
export default function Landing() {
	useRedirectKnownUserToLab()
	return (
		<>
			<PageHelmet pageTitle="/" />
			<div className="min-h-screen w-full relative">
				<div className="fixed inset-0">
					<GridPattern
						isDashed={true}
						dashSize={4}
						orientation="vertical"
						marginLeft={230}
						marginRight={230}
						columnCount={7} // 3 columns between borders
					/>
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

				{/* <div className="relative z-10">
					<div className="relative z-20 flex flex-col items-center justify-center px-4 md:px-16 py-8">
						<JustKeepBuilding />
					</div>
				</div>

				<div className="relative z-10 flex flex-col items-center justify-center px-4 md:px-16 h-auto md:h-[60vh]
				bg-standardBackground transition-all duration-300">
					<DesignThatInspiresCard />
				</div>

				<div className="flex flex-col relative items-center justify-center z-10 px-4 md:px-12">
					<PipUseCases />
				</div>

				<div className="flex flex-col items-center justify-center z-10 bg-standardBackground
				relative transition-all duration-300">
					<div className="px-4 md:px-16">
						<DiscoverSection />
					</div>
					<ProductShowcase />
				</div>

				<div className="relative z-10 flex flex-col items-center justify-center px-4 md:px-16">
					<LearnByDoing />
				</div> */}

				<LandingSectionContainer extraClasses="bg-pipTheme py-32 mt-12">
					<TheLittleThings />
				</LandingSectionContainer>

				<LandingSectionContainer>
					<BridgingTwoWorlds />
				</LandingSectionContainer>

				<LandingSectionContainer>
					<WhoWeAre />
				</LandingSectionContainer>

				<div className="flex flex-col relative items-center justify-center py-16 md:py-32 z-10 px-4 md:px-16
				bg-gradient-to-b from-pipTheme to-standardBackground dark:from-pipTheme
				text-white dark:text-questionText transition-all duration-300">
					<SignUpForUpdates />
				</div>
			</div>
		</>
	)
}
