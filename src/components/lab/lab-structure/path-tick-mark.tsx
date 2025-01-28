interface PathMarkProps {
    startPosition: { x: number; y: number }
    endPosition: { x: number; y: number }
    arcDirection?: ArcDirection
}

export default function PathMark(props: PathMarkProps) {
	const { startPosition, endPosition, arcDirection = "straight" } = props
	const dx = endPosition.x - startPosition.x
	const dy = endPosition.y - startPosition.y
	const length = Math.sqrt(dx * dx + dy * dy)

	const getPathData = () => {
		if (arcDirection === "straight") {
			return `
                M ${startPosition.x} ${startPosition.y}
                L ${endPosition.x} ${endPosition.y}
            `
		}

		const isHorizontal = Math.abs(dy) < 50

		if (isHorizontal) {
			const arcHeight = 65
			const controlY = startPosition.y + (arcDirection === "up" ? -arcHeight : arcHeight)
			const control1X = startPosition.x + dx * 0.25
			const control2X = startPosition.x + dx * 0.75

			return `
				M ${startPosition.x} ${startPosition.y}
				C ${control1X} ${controlY}
				${control2X} ${controlY}
				${endPosition.x} ${endPosition.y}
			`
		}

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

	const numberOfDashes = Math.floor(length / 20)

	return (
		<svg
			className="absolute top-0 left-0 w-full h-full"
			style={{
				pointerEvents: "none",
				transform: "translateX(0px)" // Ensure SVG positioning starts at 0
			}}
		>
			<path
				d={getPathData()}
				fill="none"
				stroke="transparent"
				id="motionPath"
			/>

			{Array.from({ length: numberOfDashes }, (_, i) => {
				const progress = (i + 1) / (numberOfDashes + 1)
				return (
					<circle
						key={i}
						r="2"
						className="fill-zinc-400 dark:fill-zinc-500"
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
