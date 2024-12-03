import { FaTachometerAlt } from "react-icons/fa"
import SensorsSkeloton from "./sensors-skeloton"
import { bentoIconSize } from "../../../utils/constants"
import { DottedTextTooltip } from "../../dotted-underline-text"

// TODO: Remove precision from 2 of the three sensor bento boxes
export default function IMUCard() {
	return (
		<SensorsSkeloton
			title={(
				<>
					9-Axis&nbsp;
					<DottedTextTooltip tooltipMessage="BNO085">
						IMU
					</DottedTextTooltip>
				</>
			)}
			description="Track orientation, acceleration, and motion with precision"
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
