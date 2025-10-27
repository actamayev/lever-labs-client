export default function HeroBackground(): React.ReactNode {
	return (
		<>
			{/* Desktop/tablet image */}
			<img
				className="wide:opacity-0 sm:opacity-100 opacity-0 w-full h-full object-cover absolute"
				src="/pip2_new.jpg"
				alt="Pip Hero Desktop"
				style={{ objectPosition: "left center" }}
			/>

			{/* Wide screen image */}
			<img
				className="wide:opacity-100 opacity-0 w-full h-full object-cover absolute"
				src="/pip2_new.jpg"
				alt="Pip Hero Wide"
				style={{ objectPosition: "center center" }}
			/>

			{/* Mobile image */}
			<img
				className="sm:opacity-0 opacity-100 w-full h-full object-cover absolute"
				src="/pip2_new.jpg"
				alt="Pip Hero Mobile"
				style={{ objectPosition: "center center" }}
			/>
		</>
	)
}

