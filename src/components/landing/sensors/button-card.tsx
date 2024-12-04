import { motion } from "framer-motion"
import { RiRadioButtonFill } from "react-icons/ri"
import { bentoIconSize } from "../../../utils/constants"
import SensorsSkeleton from "./sensors-skeleton"

// TODO: remove 'add' from Add custom controls to your Pip" either here or in the modules page
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
						<RiRadioButtonFill
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
