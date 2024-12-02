import Features from "../components/home/features"
import Sensors from "../components/home/sensors/sensors"
import PageHelmet from "../components/helmet/page-helmet"
import LandingHeader from "../components/home/landing-header"
import GridPattern from "../components/shadcn/ui/grid-pattern"
import WhoWeAre from "../components/home/who-we-are/who-we-are"
import SignUpForUpdates from "../components/home/sign-up-for-updates"
import { JustKeepBuilding } from "../components/home/just-keep-building"
import DiscoverSection from "../components/home/discover/discover-section"
import ProductShowcase from "../components/home/discover/product-showcase"
import DesignThatInspiresCard from "../components/home/design-that-inspires-card"
import LearnByDoing from "../components/home/learn-by-doing/learn-by-doing-header"

export default function Home() {
	return (
		<>
			<PageHelmet pageTitle="/" />
			<div className="min-h-screen w-full relative">
				<GridPattern isDashed={true} dashSize={2} orientation="both" />
				<div
					className="relative z-10 bg-gradient-to-b from-white to-sky-200 dark:from-zinc-700 dark:to-black
					text-black dark:text-white"
				>
					<div className="flex flex-col items-center justify-center pt-32 px-64">
						<LandingHeader />
					</div>
				</div>
				<div className="h-screen relative z-10 flex flex-col items-center justify-center px-20 bg-white dark:bg-black">
					<JustKeepBuilding />
				</div>
				<div className="relative z-10 flex flex-col items-center justify-center px-20 h-screen">
					<DesignThatInspiresCard />
				</div>
				<div
					className="mt-20 h-screen relative z-10 flex flex-col items-center justify-center"
					style={{ backgroundColor: "rgb(10, 37, 64)" }}
				>
					<Sensors />
				</div>
				<div className="relative z-10 flex flex-col items-center justify-center mb-14 px-20">
					<LearnByDoing />
					<DiscoverSection />
				</div>
				<div className="flex flex-col items-center justify-center z-10 bg-white dark:bg-black relative">
					<ProductShowcase />
				</div>
				<div className="flex z-10 relative bg-gradient-to-b from-white to-indigo-800 dark:from-black dark:to-indigo-600">
					<Features />
				</div>
				<WhoWeAre />
				<div
					className="flex flex-col relative items-center justify-center py-32 z-10
					bg-gradient-to-b from-pipTheme to-white dark:from-pipTheme dark:to-black text-white"
				>
					<SignUpForUpdates />
				</div>
			</div>
		</>
	)
}
