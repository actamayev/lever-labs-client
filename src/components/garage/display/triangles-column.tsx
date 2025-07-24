interface TrianglesColumnProps {
	onApplyDesign: () => void
	onApplyText: () => void
	canApplyDesign: boolean
	canApplyText: boolean
}

export default function TrianglesColumn(props: TrianglesColumnProps) {
	const { onApplyDesign, onApplyText, canApplyDesign, canApplyText } = props

	return (
		<div className="flex flex-col justify-center space-y-8">
			{/* Triangle for design - clickable to apply design */}
			<div className="flex justify-center">
				<button
					onClick={onApplyDesign}
					disabled={!canApplyDesign}
					className={`transition-all duration-200 ${
						canApplyDesign
							? "hover:scale-110 cursor-pointer"
							: "opacity-50 cursor-not-allowed"
					}`}
					title={canApplyDesign ? "Apply selected design" : "Select a design first"}
				>
					<div
						className={`w-0 h-0 border-l-[16px] border-t-[12px] border-b-[12px]
					border-t-transparent border-b-transparent transition-colors duration-200 ${
		canApplyDesign
			? "border-l-blue-500 hover:border-l-blue-400"
			: "border-l-gray-600"
		}`}></div>
				</button>
			</div>

			{/* Triangle for text - clickable to apply text */}
			<div className="flex justify-center">
				<button
					onClick={onApplyText}
					disabled={!canApplyText}
					className={`transition-all duration-200 ${
						canApplyText
							? "hover:scale-110 cursor-pointer"
							: "opacity-50 cursor-not-allowed"
					}`}
					title={canApplyText ? "Apply entered text" : "Enter text first"}
				>
					<div
						className={`w-0 h-0 border-l-[16px] border-t-[12px] border-b-[12px]
							border-t-transparent border-b-transparent transition-colors duration-200 ${
		canApplyText
			? "border-l-green-500 hover:border-l-green-400"
			: "border-l-gray-600"
		}`}></div>
				</button>
			</div>
		</div>
	)
}
