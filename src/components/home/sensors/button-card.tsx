import { motion } from "framer-motion"
import { RiRadioButtonFill } from "react-icons/ri"
import { cn } from "@/lib/shadcn/utils"

function ButtonCard() {
	return (
		<div
			className={cn(
				"group relative flex flex-col justify-between overflow-hidden rounded-xl",
				"bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
				"transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)]",
				"dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
				"row-start-3 row-span-1 col-start-1 col-span-1"
			)}
		>
			<div>
				<img className="absolute -right-20 -top-20 opacity-60" />
			</div>
			<div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6">
				<div className="pointer-events-auto w-fit">
					<motion.div
						whileTap={{ scale: 0.8 }}
						transition={{
							type: "spring",
							stiffness: 500,
							damping: 10
						}}
					>
						<RiRadioButtonFill
							className="h-12 w-12 text-black dark:text-white cursor-pointer"
						/>
					</motion.div>
				</div>
				<h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
					Buttons
				</h3>
				<p className="max-w-lg text-neutral-400">
					We automatically save your files as you type.
				</p>
			</div>
		</div>
	)
}

export default ButtonCard
