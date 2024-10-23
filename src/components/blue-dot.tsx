export default function BlueDot() {
	const dotStyle: React.CSSProperties = {
		backgroundColor: "rgb(0,61,165)"
	}

	return (
		<>
			<div
				className="w-48 h-48 rounded-full border-2"
				style={dotStyle}
			/>
			Blue Dot Robots
		</>
	)
}
