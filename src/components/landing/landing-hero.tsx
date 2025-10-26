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

			{/* Complete TRMNL hero structure with header and text */}
			<div className="h-full mx-auto pb-24 z-10 relative">
				<div className="px-8 md:px-20 xl:px-32 max-w-9xl xs:pt-4 mx-auto">
					<nav className="relative py-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<a href="/" className="inline-block">
									<img className="h-8 text-black mt-1" src="/trmnl--glyph-black.svg" alt="TRMNL logo" />
								</a>
							</div>

							{/* Mobile menu button */}
							<button className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-black">
								<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
								</svg>
							</button>

							{/* Desktop navigation */}
							<div className="hidden md:flex items-center gap-2">
								<a className="inline-block py-2 px-3 transition-all duration-200 text-sm font-medium tracking-tight rounded-full hover:bg-gray-100 hover:text-black text-black" href="/login">Login</a>
								<a className="inline-block py-2 px-3 transition-all duration-200 text-sm font-medium tracking-tight rounded-full hover:bg-gray-100 hover:text-black text-black" href="/signup">Sign up</a>
							</div>
						</div>
					</nav>

				</div>
				{/* Hero text positioned at bottom */}
				<div className="container w-full flex flex-wrap items-end justify-between absolute bottom-16 sm:bottom-20 2xl:bottom-32 left-1/2 transform -translate-x-1/2 px-8 md:px-20 xl:px-32 max-w-9xl">
					<div className="flex flex-col z-10 sm:mb-0 mb-3 xs:mb-6 relative">
						<div className="hidden blur-lg bg-[#dadada] xs:hidden absolute w-full h-full -z-10 opacity-60"></div>
						<h1 className="font-heading tracking-tight text-black font-medium text-5xl xs:text-5xl sm:text-5xl sm:text-left text-center mb-4 xs:mb-3">
							Like Duolingo, for robotics
						</h1>
						<p className="text-sm xs:text-base sm:text-sm sm:px-0 px-6 sm:text-left text-center tracking-tight text-black font-light">
							With Pip, learning feels like play
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
