export default function HeroBackground(): React.ReactNode {
	return (
		<>
			{/* Desktop/tablet image */}
			<img
				className="wide:opacity-0 sm:opacity-100 opacity-0 w-full h-full object-cover absolute"
				src="/pip2_new.jpg"
				alt="TRMNL hero"
				style={{ objectPosition: "left center" }}
			/>

			{/* Wide screen image */}
			<img
				className="wide:opacity-100 opacity-0 w-full h-full object-cover absolute"
				src="/pip2_new.jpg"
				alt="TRMNL hero wide"
				style={{ objectPosition: "center center" }}
			/>

			{/* Mobile image */}
			<img
				className="sm:opacity-0 opacity-100 w-full h-full object-cover absolute"
				src="/pip2_new.jpg"
				alt="TRMNL hero mobile"
				style={{ objectPosition: "center center" }}
			/>
		</>
	)
}

