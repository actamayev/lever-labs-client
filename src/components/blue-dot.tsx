export default function BlueDot() {
	return (
		<div className="flex flex-col items-center">
			<div
				className="w-48 h-48 rounded-full border-2"
				style={{ backgroundColor: "rgb(0,61,165)" }}
			/>
			<div className="text-3xl font-semibold mb-4 text-zinc-800 dark:text-zinc-50 text-center">
				Blue Dot Robots
			</div>
		</div>
	)
}
