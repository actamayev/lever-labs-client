import { motion } from "framer-motion"
import { CustomButton } from "../icons/custom-button"

export default function ButtonSpringAnimation({ iconSize } : { iconSize: number }) {
	return (
		<div className="pointer-events-auto w-fit">
			<motion.div
				whileTap={{ scale: 0.8 }}
				transition={{
					type: "spring",
					stiffness: 500,
					damping: 10
				}}
			>
				<CustomButton
					className="text-black dark:text-white cursor-pointer"
					size={iconSize}
				/>
			</motion.div>
		</div>
	)
}
