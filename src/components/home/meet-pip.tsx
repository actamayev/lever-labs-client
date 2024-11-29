import TextRevealByWord from "../shadcn/ui/text-reveal"

export default function MeetPip() {
	return (
		<div className="flex flex-col items-center justify-center">
			<img
				src="pip-render-11-28.png"
				alt="Product visualization"
				className="rounded-lg object-cover mb-12"
				style={{ width: "700px" }}
			/>
			<div className="z-10 flex items-center justify-center rounded-lg border bg-white dark:bg-black">
				<TextRevealByWord text="Meet Pip." />
			</div>
		</div>
	)
}
