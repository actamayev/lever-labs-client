import { FaTachometerAlt } from "react-icons/fa"
import SensorsSkeleton from "./sensors-skeleton"
import { bentoIconSize } from "../../../utils/constants"
import { DottedTextTooltip } from "../../dotted-underline-text"

export default function IMUCard() {
	return (
		<SensorsSkeleton
			title={(
				<>
					9-Axis&nbsp;
					<DottedTextTooltip tooltipMessage="BNO085">
						IMU
					</DottedTextTooltip>
				</>
			)}
			description="Seemlessly track orientation, acceleration, and motion"
			icon={
				<div className="w-fit">
					<FaTachometerAlt
						className="origin-left transition-all duration-300 text-black dark:text-white"
						size={bentoIconSize}
					/>
				</div>
			}
			outerDivStyles="row-start-1 col-start-2 col-end-2"
		/>
	)
}
