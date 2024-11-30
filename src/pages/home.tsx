import Features from "../components/home/features"
import WhoWeAre from "../components/home/who-we-are/who-we-are"
import Sensors from "../components/home/sensors/sensors"
import PageHelmet from "../components/helmet/page-helmet"
import LandingHeader from "../components/home/landing-header"
import GridPattern from "../components/shadcn/ui/grid-pattern"
import { JustKeepBuilding } from "../components/home/just-keep-building"
import DiscoverSection from "../components/home/discover/discover-section"
import DesignThatInspiresCard from "../components/home/design-that-inspires-card"
import LearnByDoing from "../components/home/learn-by-doing/learn-by-doing-header"

// Add a section with a blue dot with a description to the side of it that says who we are.
// TODO: Transition the current Built by engineers, for future engineers to the who we are section.
// "We know getting started robotics can appear tough and feel daunting. We've been there...",
// TODO: Consider dot pattern to be less on the sides (gradiented) (or not at all [similar to stripe's grid, doesn't start at the end])
export default function Home() {
	return (
		<>
			<PageHelmet pageTitle="/" />
			<div className="min-h-screen w-full relative">
				<GridPattern isDashed={true} dashSize={7} orientation="both" />
				{/* <DotPattern /> */}
				<div className="relative z-10 flex flex-col items-center justify-center pt-32 px-64 pb-20">
					<LandingHeader />
					<JustKeepBuilding />
					<DesignThatInspiresCard />
					<Sensors />
					<LearnByDoing />
					<DiscoverSection />
					<Features />
					<WhoWeAre />
				</div>
			</div>
		</>
	)
}
