interface Props {
	startPosition: { x: number; y: number }
	endPosition: { x: number; y: number }
  }

export default function PathTickMark({ startPosition, endPosition }: Props) {
// Calculate angle and length
	const dx = endPosition.x - startPosition.x
	const dy = endPosition.y - startPosition.y
	const length = Math.sqrt(dx * dx + dy * dy)
	const angle = Math.atan2(dy, dx) * (180 / Math.PI)

	// Create small dashes along the path
	const numberOfDashes = Math.floor(length / 20) // One dash every 20px
	const dashes = Array.from({ length: numberOfDashes }, (_, i) => {
		const progress = (i + 1) / (numberOfDashes + 1)
		const x = startPosition.x + dx * progress
		const y = startPosition.y + dy * progress

		return (
			<div
				key={i}
				className="absolute w-2 h-0.5 bg-zinc-300 dark:bg-zinc-700 transform -translate-x-1/2 -translate-y-1/2"
				style={{
					left: x,
					top: y,
					transform: `translate(-50%, -50%) rotate(${angle}deg)`
				}}
			/>
		)
	})

	return <>{dashes}</>
}
