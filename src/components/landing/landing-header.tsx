import { useCallback } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import BlurFade from "../shadcn/ui/blur-fade"

function ScrollIndicator () {
	const handleClick = useCallback(() => {
		const element = document.getElementById("just-keep-building")
		if (!element) return
		const headerHeight = 56 // Height of your fixed header
		const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
		const offsetPosition = elementPosition - headerHeight

		window.scrollTo({
			top: offsetPosition,
			behavior: "smooth"
		})
	}, [])

	return (
		<div className="absolute -bottom-20 left-1/2 -translate-x-1/2">
			<motion.div
				animate={{
					y: [0, 60, 0]
				}}
				transition={{
					duration: 1,
					repeat: Infinity,
					ease: "easeInOut",
					repeatType: "reverse"
				}}
				className="cursor-pointer hover:opacity-70 transition-all duration-300"
				onClick={handleClick}
			>
				<ChevronDown size={45}/>
			</motion.div>
		</div>
	)
}

export default function LandingHeader() {
	return (
		<div className="relative w-full">
			<div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 w-full max-w-7xl mx-auto">
				<section id="header" className="flex-1 px-4 lg:px-0">
					<div className="flex flex-col">
						<div>
							<BlurFade delay={0.35} inView>
								<span className="text-5xl lg:text-8xl font-semibold">
                                    Hey there,
								</span>
							</BlurFade>
						</div>
						<div>
							<BlurFade delay={0.35 * 2} inView>
								<h2 className="text-5xl lg:text-8xl dark:text-white mt-6 lg:mt-8 font-semibold">
                                    Meet Pip
								</h2>
							</BlurFade>
						</div>
						<div>
							<BlurFade delay={0.35 * 3} inView>
								<h1 className="text-xl lg:text-3xl text-zinc-800 dark:text-white mt-8 lg:mt-14 font-medium">
                                    Pip is a powerful educational robot that's easy to use.
								</h1>
								<h2 className="text-xl lg:text-3xl text-zinc-800 dark:text-white mt-4 lg:mt-8 font-medium">
                                    Get started on your robotics journey today.
								</h2>
							</BlurFade>
						</div>
					</div>
				</section>

				<div className="flex-1 w-full lg:w-auto px-4 lg:px-0">
					<BlurFade delay={0.35 * 3} inView>
						<div className="w-full">
							<img
								src="pip_top_right.png"
								alt="Product visualization"
								className="w-full h-auto"
							/>
						</div>
					</BlurFade>
				</div>
			</div>
			<BlurFade delay={1} inView>
				<ScrollIndicator />
			</BlurFade>
		</div>
	)
}
