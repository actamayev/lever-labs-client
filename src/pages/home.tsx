import PageHelmet from "../components/helmet/page-helmet"
import LandingHeader from "../components/home/landing-header"
import { JustKeepBuilding } from "../components/home/just-keep-building"
import DesignThatInspiresCard from "../components/home/design-that-inspires-card"
import GridPattern from "../components/shadcn/ui/grid-pattern"

// Add a section with a blue dot with a description to the side of it that says who we are.
// TODO: Transition the current Built by engineers, for future engineers to the who we are section.
// "We know getting started robotics can appear tough and feel daunting. We've been there...",
// TODO: Consider dot pattern to be less on the sides (gradiented) (or not at all [similar to stripe's grid, doesn't start at the end])
export default function Home() {
	return (
		<>
			<PageHelmet pageTitle="/" />
			<div className="min-h-screen w-full relative">
				<GridPattern isDashed={true} dashSize={5} orientation="both" />
				{/* <DotPattern /> */}
				<div className="relative z-10 flex flex-col items-center justify-center py-32">
					<LandingHeader />
					<div className="px-64">
						<JustKeepBuilding />
						<DesignThatInspiresCard />
					</div>
				</div>
			</div>
		</>
	)
}
