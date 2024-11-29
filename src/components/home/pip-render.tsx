import BlurFade from "../shadcn/ui/blur-fade"
import TextRevealByWord from "../shadcn/ui/text-reveal"

export default function PipRender() {
	return (
		<div className="flex flex-col items-center justify-center w-full">
			<BlurFade delay={0.3 * 3} inView>
				<img
					src="pip-render-11-28.png"
					alt="Product visualization"
					className="rounded-lg object-cover w-full max-w-[700px]"
				/>
			</BlurFade>
			<div className="my-24">
				<TextRevealByWord
					text="Designed to make learning robotics fun and seamless."
					className="w-full"
					instantTransition={true}
				/>
			</div>
		</div>
	)
}
