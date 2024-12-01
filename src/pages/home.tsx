import Features from "../components/home/features"
import Sensors from "../components/home/sensors/sensors"
import PageHelmet from "../components/helmet/page-helmet"
import LandingHeader from "../components/home/landing-header"
import GridPattern from "../components/shadcn/ui/grid-pattern"
import WhoWeAre from "../components/home/who-we-are/who-we-are"
import SignUpForUpdates from "../components/home/sign-up-for-updates"
import { JustKeepBuilding } from "../components/home/just-keep-building"
import DiscoverSection from "../components/home/discover/discover-section"
import DesignThatInspiresCard from "../components/home/design-that-inspires-card"
import LearnByDoing from "../components/home/learn-by-doing/learn-by-doing-header"
import ProductShowcase from "../components/home/discover/product-showcase"

// TODO: Consider dot pattern to be less on the sides (gradiented) (or not at all [similar to stripe's grid, doesn't start at the end])
// eslint-disable-next-line max-len
// TODO: Make the landing header a gradient from light to darker blue as you scroll down (tailwind radial gradient (https://tailwindui.com/components/marketing/sections/cta-sections)
// until you hit just keep building, when it should trasnition to the grid. Similar to mercury landing
// then it should be grid for a while, and then it should be a color (or a ful-screen side by side view of the lab/sandbox
// (like Apple.com (ipad air and airpods pro 2 side by side))
// after which it should trasnition to a new background (either the dotted background, or a single color))
export default function Home() {
	return (
		<>
			<PageHelmet pageTitle="/" />
			<div className="min-h-screen w-full relative">
				<GridPattern isDashed={true} dashSize={2} orientation="both" />
				{/* <DotPattern /> */}
				<div className="relative z-10 bg-gradient-to-b from-white to-sky-200 dark:from-zinc-700 dark:to-black
				text-black dark:text-white">
					<div className="flex flex-col items-center justify-center pt-32 px-64 pb-20">
						<LandingHeader />
					</div>
				</div>
				<JustKeepBuilding />
				<div className="relative z-10 flex flex-col items-center justify-center px-24 h-screen">
					<DesignThatInspiresCard />
				</div>
				<Sensors />
				<div className="relative z-10 flex flex-col items-center justify-center mb-14 px-28">
					<LearnByDoing />
					<DiscoverSection />
				</div>
				<div className="flex flex-col items-center justify-center z-10 bg-white dark:bg-black relative">
					<ProductShowcase />
				</div>
				<Features />
				<WhoWeAre />
				<div className="flex flex-col relative items-center justify-center py-32 z-10
				bg-gradient-to-b from-pipTheme to-white dark:from-pipTheme dark:to-black text-white">
					<SignUpForUpdates />
				</div>
			</div>
		</>
	)
}
