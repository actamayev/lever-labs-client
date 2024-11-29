import BlueDot from "../components/home/blue-dot"
import PageHelmet from "../components/helmet/page-helmet"
import DotPattern from "../components/shadcn/ui/dot-pattern"
import { cn } from "../lib/shadcn/utils"
import LandingHeader from "../components/home/landing-header"
import { Frictionless } from "../components/home/frictionless"
import DesignThatInspiresCard from "../components/home/design-that-inspires-card"

// TODO: Consider moving from Dot pattern to grid.
// Pros of dot pattern: looks just like the sandbox
// Pros of grid: looks like a blueprint (engineeringy)
// Add a section with a blue dot with a description to the side of it that says who we are.
// Transition the current Built by engineers, for future engineers to the who we are section.
// "We know getting started robotics can appear tough and feel daunting. We've been there...",
export default function Home() {
	return (
		<>
			<PageHelmet pageTitle="/" />
			<div className="min-h-screen w-full bg-background relative">
				<DotPattern />
				<div className="relative z-10 flex flex-col items-center justify-center py-16">
					<LandingHeader />
					<div className="px-80 mt-6">
						<Frictionless />
						<DesignThatInspiresCard />
					</div>
				</div>
			</div>
		</>
	)
}
