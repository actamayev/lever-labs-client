import PageHelmet from "../components/helmet/page-helmet"
import GridPattern from "../components/shadcn/ui/grid-pattern"
import LearnByDoing from "../components/landing/learn-by-doing"
import LandingHeader from "../components/landing/landing-header"
import FeaturesBento from "../components/landing/features-bento"
import WhoWeAre from "../components/landing/who-we-are/who-we-are"
import JustKeepBuilding from "../components/landing/just-keep-building"
import SignUpForUpdates from "../components/landing/sign-up-for-updates"
import PipUseCases from "../components/landing/pip-use-cases/pip-use-cases"
import DiscoverSection from "../components/landing/discover/discover-section"
import ProductShowcase from "../components/landing/discover/product-showcase"
import DesignThatInspiresCard from "../components/landing/design-that-inspires-card"

// 2/15/25 TODO: Make the landing page px-4 for mobile
// 1/1/25 TODO: Add Duolingo for robotics somewhere (ie. Pip paired with blue dot is like Duolingo for robotics)
export default function Landing() {
	return (
		<>
			<PageHelmet pageTitle="/" />
			<div className="min-h-screen w-full relative">
				<div className="fixed inset-0">
					<GridPattern isDashed={true} dashSize={2} orientation="both" />
				</div>
				<div className="relative z-10 bg-gradient-to-b from-white to-sky-200 dark:from-darkThemeBackground dark:to-zinc-700
				text-black dark:text-white transition-all duration-300">
					{/* the 56 px is the height of the header (used to make sure home page sizeing is aligned) */}
					<div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4 md:px-8 lg:px-16">
						<LandingHeader />
					</div>
				</div>

				<div className="relative z-10">
					<div className="relative z-20 flex flex-col items-center justify-center px-4 md:px-16 py-8">
						<JustKeepBuilding />
					</div>
				</div>

				<div className="relative z-10 flex flex-col items-center justify-center px-4 md:px-16 h-auto md:h-[60vh]
				bg-lightThemeBackground dark:bg-darkThemeBackground transition-all duration-300">
					<DesignThatInspiresCard />
				</div>

				<div className="flex flex-col relative items-center justify-center z-10 px-4 md:px-12">
					<PipUseCases />
				</div>

				<div className="flex flex-col items-center justify-center z-10 bg-lightThemeBackground dark:bg-darkThemeBackground
				relative transition-all duration-300">
					<div className="px-4 md:px-16">
						<DiscoverSection />
					</div>
					<ProductShowcase />
				</div>

				<div className="relative z-10 flex flex-col items-center justify-center px-4 md:px-16">
					<LearnByDoing />
				</div>

				<div className="flex relative items-center justify-center z-10 py-8 md:py-12 px-4 md:px-32
				bg-gradient-to-b from-lightThemeBackground to-pipTheme dark:from-darkThemeBackground
				dark:to-pipTheme transition-all duration-300">
					<FeaturesBento />
				</div>

				<div className="relative flex my-8 md:my-20 z-10 px-4 md:px-16">
					<WhoWeAre />
				</div>

				<div className="flex flex-col relative items-center justify-center py-16 md:py-32 z-10 px-4 md:px-16
				bg-gradient-to-b from-pipTheme to-lightThemeBackground dark:from-pipTheme dark:to-darkThemeBackground text-white
				transition-all duration-300">
					<SignUpForUpdates />
				</div>
			</div>
		</>
	)
}
