import TextRevealByWord from "../shadcn/ui/text-reveal"

export default function PipRender() {
	return (
		<div className="flex flex-col items-center justify-center w-full">
			<img
				src="pip-render-11-28.png"
				alt="Product visualization"
				className="rounded-lg object-cover w-full max-w-[700px]"
			/>
			<div className="mt-20">
				{/* test */}
				<TextRevealByWord
					text="Designed to make learning robotics fun and seamless."
					className="w-full"
				/>
			</div>
		</div>
	)
}
