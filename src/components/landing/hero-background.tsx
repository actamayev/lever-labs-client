import Image from "next/image"

export default function HeroBackground(): React.ReactNode {
	return (
		<>
			{/* Desktop/tablet image */}
			<Image
				className="wide:opacity-0 sm:opacity-100 opacity-0 w-full h-full object-cover absolute"
				src="/trmnl-hero.jpg"
				alt="TRMNL hero"
				style={{ objectPosition: "left center" }}
				fill
				priority
			/>

			{/* Wide screen image */}
			<Image
				className="wide:opacity-100 opacity-0 w-full h-full object-cover absolute"
				src="/trmnl-hero-wide.jpg"
				alt="TRMNL hero wide"
				style={{ objectPosition: "center center" }}
				fill
				priority
			/>

			{/* Mobile image */}
			<Image
				className="sm:opacity-0 opacity-100 w-full h-full object-cover absolute"
				src="/trmnl-hero-mobile.jpg"
				alt="TRMNL hero mobile"
				style={{ objectPosition: "center center" }}
				fill
				priority
			/>
		</>
	)
}
