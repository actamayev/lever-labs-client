import BlurFade from "../shadcn/ui/blur-fade"

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
				</div>
			</div>
		</>
	)
}
