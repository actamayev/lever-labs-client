import BlurFade from "../shadcn/ui/blur-fade"

export default function LandingHeader() {
	return (
		<section id="header">
			<div className="flex flex-col">
				<div className="flex flex-row">
					<BlurFade delay={0.25} inView>
						<h2 className="text-7xl">
							Pip:&nbsp;
						</h2>
					</BlurFade>
					<BlurFade delay={0.25 * 2} inView>
						<span className="text-7xl">
							Robotics, Re-imagined.
						</span>
					</BlurFade>
				</div>
				<div>
					<BlurFade delay={0.25 * 3} inView>
						<span className="text-2xl justify-center flex mt-2">
						Designed to make learning robotics fun and seamless.
						</span>
					</BlurFade>
				</div>
			</div>
		</section>
	)
}
