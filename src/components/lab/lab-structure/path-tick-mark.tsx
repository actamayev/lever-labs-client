interface PathMarkProps {
	startPosition: { x: number; y: number }
	endPosition: { x: number; y: number }
}

export default function PathMark({ startPosition, endPosition }: PathMarkProps) {
// Calculate basic path properties
	const dx = endPosition.x - startPosition.x
	const dy = endPosition.y - startPosition.y
	const length = Math.sqrt(dx * dx + dy * dy)

	// Generate path and control points based on positions
	const getPathData = () => {
		const isHorizontal = Math.abs(dy) < 50 // If points are roughly on same level
		const isAscending = endPosition.y < startPosition.y

		// For horizontal paths, create a simple arc
		if (isHorizontal) {
			const controlY = startPosition.y + (isAscending ? -50 : 50) // Arc height
			return `
				M ${startPosition.x} ${startPosition.y}
				Q ${(startPosition.x + endPosition.x) / 2} ${controlY}
				${endPosition.x} ${endPosition.y}
			`
		}

		// For vertical paths, create an S-curve
		const control1X = startPosition.x + dx * 0.25
		const control1Y = startPosition.y
		const control2X = startPosition.x + dx * 0.75
		const control2Y = endPosition.y

		return `
			M ${startPosition.x} ${startPosition.y}
			C ${control1X} ${control1Y}
				${control2X} ${control2Y}
				${endPosition.x} ${endPosition.y}
		`
	}

	// Calculate dash positions along the path
	const numberOfDashes = Math.floor(length / 20) // One dash every 20px

	return (
		<svg className="absolute top-0 left-0 w-full h-full" style={{ pointerEvents: "none" }}>
			{/* Invisible path for reference */}
			<path
				d={getPathData()}
				fill="none"
				stroke="transparent"
				id="motionPath"
			/>

			{/* Dashes along the path */}
			{Array.from({ length: numberOfDashes }, (_, i) => {
				const progress = (i + 1) / (numberOfDashes + 1)
				return (
					<circle
						key={i}
						r="2"
						className="fill-zinc-300 dark:fill-zinc-700"
					>
						<animateMotion
							dur="0.01s"
							fill="freeze"
							path={getPathData()}
							keyPoints={`${progress};${progress}`}
							keyTimes="0;1"
						/>
					</circle>
				)
			})}
		</svg>
	)
}
