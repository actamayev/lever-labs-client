import BlurFade from "../shadcn/ui/blur-fade"
import TextRevealByWord from "../shadcn/ui/text-reveal"

export default function LandingHeader() {
	return (
		<>
			<section id="header">
				<div className="flex flex-col">
					<div>
						<BlurFade delay={0.3} inView>
							<span className="text-7xl">
								Robotics, Re-imagined.
							</span>
						</BlurFade>
					</div>
					<div>
						<BlurFade delay={0.3 * 2} inView>
							<h2 className="text-7xl justify-center flex dark:text-white mt-8">
								Meet Pip.
							</h2>
						</BlurFade>
					</div>
				</div>
			</section>
			<div className="px-80 mt-10">
				<div className="flex flex-col items-center justify-center w-full">
					<BlurFade delay={0.3 * 3} inView>
						<img
							src="pip-render-11-28.png"
							alt="Product visualization"
							className="rounded-lg object-cover w-full max-w-[700px]"
						/>
					</BlurFade>
					<BlurFade delay={0.3 * 4} inView>
						<div className="mt-10 text-2xl italic">
							Fig. 1: Pip
						</div>
					</BlurFade>
					<div className="my-24">
						<TextRevealByWord
							text="Designed to make learning robotics fun and seamless."
							className="w-full"
							instantTransition={true}
						/>
					</div>
				</div>
			</div>
		</>
	)
}
