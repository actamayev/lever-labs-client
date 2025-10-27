"use client"

import FAQ from "../components/landing/faq"
import Footer from "../components/footer/footer"
import LandingHero from "../components/landing/landing-hero"
import PlatformSection from "../components/landing/platform-section"
import FeaturesSection from "../components/landing/features-section"
import LandingNavigation from "../components/landing/landing-navigation"
import TestimonialsSection from "../components/landing/testimonials-section"
import EarlyAccessForm from "../components/custom-shadcn-blocks/early-access"
import SimpleFeaturesSection from "../components/landing/simple-features-section"

export default function Landing(): React.ReactNode {
	return (
		<>
			<LandingNavigation />
			<LandingHero />
			<PlatformSection />
			<SimpleFeaturesSection />
			<FeaturesSection />
			<TestimonialsSection />
			<FAQ />
			<EarlyAccessForm />
			<Footer />
		</>
	)
}
