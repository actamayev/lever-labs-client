import BlueDot from "../components/home/blue-dot"
import PageHelmet from "../components/helmet/page-helmet"
import DotPattern from "../components/shadcn/ui/dot-pattern"
import { cn } from "../lib/shadcn/utils"
import LandingHeader from "../components/home/landing-header"
import { Frictionless } from "../components/home/frictionless"
import DesignThatInspiresCard from "../components/home/design-that-inspires-card"

// TODO: Consider moving frmo Dot pattern to grid.
// Pros of dot pattern: looks just like the sandbox
// Pros of grid: looks like a blueprint (engineeringy)
export default function Home() {
	return (
		<>
			<PageHelmet pageTitle="/" />
			<div className="relative flex h-[1000px] w-full flex-col items-center justify-center
			overflow-hidden rounded-lg border bg-background md:shadow-xl">
				<DotPattern />
				<LandingHeader />
				<div className="px-14 mt-6">
					<Frictionless />
					<DesignThatInspiresCard />
				</div>
				{/* <BlueDot /> */}
			</div>
		</>
	)
}
