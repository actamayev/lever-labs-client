import { motion } from "framer-motion"
import SensorsSkeleton from "./sensors-skeleton"
import { bentoIconSize } from "../../../utils/constants"
import { CustomButton } from "../../icons/custom-button"

export default function ButtonCard() {
	return (
		<SensorsSkeleton
			title="2× Buttons"
			description="Add custom controls to your Pip"
			icon= {
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
							size={bentoIconSize}
						/>
					</motion.div>
				</div>
			}
			outerDivStyles="row-start-3 row-span-1 col-start-1 col-span-1"
		/>
	)
}
