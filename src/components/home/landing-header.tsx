import { motion } from "framer-motion"
import BlurFade from "../shadcn/ui/blur-fade"
import { FaChevronDown } from "react-icons/fa6"

function ScrollIndicator () {
	return (
		<div className="absolute -bottom-20 left-1/2 -translate-x-1/2">
			<motion.div
				animate={{
					y: [0, 10, 0]
				}}
				transition={{
					duration: 1.5,
					repeat: Infinity,
					ease: "easeInOut"
				}}
				className="cursor-pointer"
			>
				<FaChevronDown size={45}/>
			</motion.div>
		</div>
	)
}

export default function LandingHeader() {
	return (
		<div className="relative w-full">
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
								src="pip_top_right.png"
								alt="Product visualization"
								// style={{ width: "100"}}
							/>
						</div>
					</BlurFade>
				</div>
			</div>
			<ScrollIndicator />
		</div>
	)
}
