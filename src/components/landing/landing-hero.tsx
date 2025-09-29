/* eslint-disable max-len */
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

			{/* Hero text overlay - matching TRMNL's positioning */}
			<div className="container w-full flex flex-wrap items-end justify-between absolute bottom-16 sm:bottom-20 2xl:bottom-32 left-1/2 transform -translate-x-1/2 px-8 md:px-20 xl:px-32 max-w-9xl">
				<div className="flex flex-col z-10 sm:mb-0 mb-3 xs:mb-6 relative">
					<div className="hidden blur-lg bg-[#dadada] xs:hidden absolute w-full h-full -z-10 opacity-60"></div>
					<h1 className="font-heading tracking-tight text-black font-medium text-5xl xs:text-5xl sm:text-5xl sm:text-left text-center mb-4 xs:mb-3">
						Clarity, at a glance
					</h1>
					<p className="text-sm xs:text-base sm:text-sm sm:px-0 px-6 sm:text-left text-center tracking-tight text-black font-light">
						TRMNL is an e-ink companion that helps you stay focused.
					</p>
				</div>
			</div>
		</div>
	)
}
