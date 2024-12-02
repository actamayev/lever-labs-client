import BlurFade from "../shadcn/ui/blur-fade"

export default function LandingHeader() {
	return (
		<div className="flex flex-col lg:flex-row items-center justify-between gap-16 w-full max-w-7xl mx-auto">
			<section id="header" className="flex-1">
				<div className="flex flex-col">
					<div>
						<BlurFade delay={0.3} inView>
							<span className="text-8xl font-semibold">
								Hey there,
							</span>
						</BlurFade>
					</div>
					<div>
						<BlurFade delay={0.3 * 2} inView>
							<h2 className="text-8xl dark:text-white mt-8 font-semibold">
								Meet Pip
							</h2>
						</BlurFade>
					</div>
				</div>
			</section>

			<div className="flex-1">
				<BlurFade delay={0.3 * 3} inView>
					<div className="w-full">
						<img
							src="pip-render-11-28.png"
							alt="Product visualization"
							className="rounded-lg object-contain w-full"
						/>
					</div>
				</BlurFade>
			</div>
		</div>
	)
}
