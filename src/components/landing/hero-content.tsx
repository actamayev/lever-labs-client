export default function HeroContent(): React.ReactNode {
	return (
		<div className="container w-full flex flex-wrap items-end justify-between absolute bottom-16 sm:bottom-20 2xl:bottom-32 left-1/2 transform -translate-x-1/2 px-8 md:px-20 xl:px-32 max-w-9xl">
			<div className="flex flex-col z-10 sm:mb-0 mb-3 xs:mb-6 relative">
				{/* Optional blur background - currently hidden */}
				<div className="hidden blur-lg bg-[#dadada] xs:hidden absolute w-full h-full -z-10 opacity-60" />

				<h1 className="font-heading tracking-tight text-black font-medium text-5xl xs:text-5xl sm:text-5xl sm:text-left text-center mb-4 xs:mb-3">
					Like Duolingo, for robotics
				</h1>

				<p className="text-sm xs:text-base sm:text-sm sm:px-0 px-6 sm:text-left text-center tracking-tight text-black font-light">
					With Pip, learning feels like play
				</p>
			</div>
		</div>
	)
}
