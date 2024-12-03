import PageHelmet from "../components/helmet/page-helmet"
import Sensors from "../components/landing/sensors/sensors"
import GridPattern from "../components/shadcn/ui/grid-pattern"
import LandingHeader from "../components/landing/landing-header"
import FeaturesBento from "../components/landing/features-bento"
import WhoWeAre from "../components/landing/who-we-are/who-we-are"
import SignUpForUpdates from "../components/landing/sign-up-for-updates"
import { JustKeepBuilding } from "../components/landing/just-keep-building"
import DiscoverSection from "../components/landing/discover/discover-section"
import ProductShowcase from "../components/landing/discover/product-showcase"
import DesignThatInspiresCard from "../components/landing/design-that-inspires-card"
import LearnByDoing from "../components/landing/learn-by-doing/learn-by-doing-header"
import PipUseCases from "../components/landing/pip-use-cases/pip-use-cases"

export default function Landing() {
	return (
		<>
			<PageHelmet pageTitle="/" />
			<div className="min-h-screen w-full relative">
				<GridPattern isDashed={true} dashSize={2} orientation="both" />
				<div
					className="relative z-10 bg-gradient-to-b from-white to-sky-200 dark:from-black dark:to-zinc-700
					text-black dark:text-white"
				>
					{/* the 56 px is the height of the header (used to make sure home page sizeing is aligned) */}
					<div className="min-h-[calc(100vh-56px)] flex items-center justify-center md:px-8 lg:px-16">
						<LandingHeader />
					</div>
				</div>
				<div className="relative z-10 flex flex-col items-center justify-center px-16 py-8">
					<JustKeepBuilding />
				</div>
				<div className="relative z-10 flex flex-col items-center justify-center px-16 h-[60vh] bg-white dark:bg-black">
					<DesignThatInspiresCard />
				</div>
				<div
					className="flex flex-col relative items-center justify-center z-10"
					// bg-gradient-to-b from-white to-pipTheme dark:from-black dark:to-pipTheme"
				>
					<PipUseCases />
					{/* <Sensors /> */}
				</div>
				<div className="flex flex-col items-center justify-center z-10 bg-white dark:bg-black relative">
					<div className="px-16">
						<DiscoverSection />
					</div>
					<ProductShowcase />
				</div>
				<div className="relative z-10 flex flex-col items-center justify-center px-16">
					<LearnByDoing />
				</div>
				<div className="flex relative items-center justify-center z-10 py-12
				bg-gradient-to-b from-white to-pipTheme dark:from-black dark:to-pipTheme px-32">
					<FeaturesBento />
				</div>
				<div className="relative flex my-20 z-10 px-16">
					<WhoWeAre />
				</div>
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
