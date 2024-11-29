import BlurFade from "../shadcn/ui/blur-fade"

export default function LandingHeader() {
	return (
		<section id="header">
			<div className="flex flex-col">
				<div>
					<BlurFade delay={0.3} inView>
						<span className="text-8xl">
							Robotics, Re-imagined.
						</span>
					</BlurFade>
				</div>
				<div>
					<BlurFade delay={0.3 * 2} inView>
						<h2 className="text-8xl justify-center flex dark:text-white mt-8">
							Meet Pip.
						</h2>
					</BlurFade>
				</div>
			</div>
		</section>
	)
}
