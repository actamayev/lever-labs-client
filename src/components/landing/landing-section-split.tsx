interface Props {
	leftContent: React.ReactNode
	rightContent: React.ReactNode
	imagePosition: "left" | "right"
}

export default function LandingSectionSplit(props: Props) {
	const { leftContent, rightContent, imagePosition } = props

	// Determine which content is the image and which is the text
	// based on the imagePosition prop
	const textContent = imagePosition === "right" ? leftContent : rightContent
	const imageContent = imagePosition === "right" ? rightContent : leftContent

	return (
		<div className="w-full">
			<div className="flex flex-col md:flex-row justify-between w-full gap-8 md:gap-16">
				{/* On mobile: Always show text first, image second */}
				{/* On md+: Position based on imagePosition prop */}

				{/* First column - text on mobile, varies on desktop */}
				<div className={`flex flex-col w-full md:w-1/2 md:justify-center order-1 
					${imagePosition === "left" ? "md:order-2" : "md:order-1"}`}>
					{textContent}
				</div>

				{/* Second column - image on mobile, varies on desktop */}
				<div className={`w-full md:w-1/2 flex mt-8 md:mt-0 md:justify-center 
					md:items-center justify-center items-center order-2 
					${imagePosition === "left" ? "md:order-1" : "md:order-2"}`}>
					{imageContent}
				</div>
			</div>
		</div>
	)
}
