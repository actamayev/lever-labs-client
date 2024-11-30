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
import SignUpForUpdates from "../components/home/sign-up-for-updates"

// TODO: Consider dot pattern to be less on the sides (gradiented) (or not at all [similar to stripe's grid, doesn't start at the end])
// TODO: Make the landing header a gradient from light to darker blue as you scroll down,
// until you hit just keep building, when it should trasnition to the grid. Similar to mercury landing
// then it should be grid for a while, and then it should be a color (or a ful-screen side by side view of the lab/sandbox
// (like Apple.com (ipad air and airpods pro 2 side by side))
// after which it should trasnition to a new background (either the dotted background, or a single color))
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
					<SignUpForUpdates />
				</div>
			</div>
		</>
	)
}
