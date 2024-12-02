import BlurFade from "../shadcn/ui/blur-fade"

export default function LandingHeader() {
	return (
		<>
			<section id="header">
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
							<h2 className="text-8xl justify-center flex dark:text-white mt-8 font-semibold">
								Meet Pip.
							</h2>
						</BlurFade>
					</div>
				</div>
			</section>
			<div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-32 mt-10">
				<div className="flex flex-col items-center justify-center w-full">
					<BlurFade delay={0.3 * 3} inView>
						<div className="max-w-6xl w-full">
							<img
								src="pip-render-11-28.png"
								alt="Product visualization"
								className="rounded-lg object-contain w-full min-w-[300px]"
							/>
						</div>
					</BlurFade>
				</div>
			</div>
		</>
	)
}
