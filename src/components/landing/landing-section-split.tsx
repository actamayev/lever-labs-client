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
				{/* On md+: Respect the original layout based on imagePosition */}

				{/* Text Content (always first on mobile) */}
				<div className="flex flex-col w-full md:w-1/2 md:justify-center order-1 md:order-none">
					{textContent}
				</div>

				{/* Image Content (always second on mobile) */}
				<div className="w-full md:w-1/2 flex mt-8 md:mt-0 md:justify-center
				md:items-center justify-center items-center order-2 md:order-none">
					{imageContent}
				</div>
			</div>
		</div>
	)
}
