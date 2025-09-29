"use client"

export default function LandingHero(): React.ReactNode {
	return (
		<div className="relative overflow-hidden h-dvh">
			{/* Match TRMNL exactly: plain img tags with responsive opacity classes */}
			<img
				className="wide:opacity-0 sm:opacity-100 opacity-0 w-full h-full object-cover absolute"
				src="/trmnl-hero.jpg"
				alt="TRMNL hero"
				style={{ objectPosition: "left center" }}
			/>
			<img
				className="wide:opacity-100 opacity-0 w-full h-full object-cover absolute"
				src="/trmnl-hero-wide.jpg"
				alt="TRMNL hero wide"
				style={{ objectPosition: "center center" }}
			/>
			<img
				className="sm:opacity-0 opacity-100 w-full h-full object-cover absolute"
				src="/trmnl-hero-mobile.jpg"
				alt="TRMNL hero mobile"
				style={{ objectPosition: "center center" }}
			/>
		</div>
	)
}
