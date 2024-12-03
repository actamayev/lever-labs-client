import { FaTachometerAlt } from "react-icons/fa"
import SensorsSkeloton from "./sensors-skeloton"
import { bentoIconSize } from "../../../utils/constants"

// TODO: BNO085 should only appear as a tooltip on hover on imu
export default function IMUCard() {
	return (
		<SensorsSkeloton
			title="9-Axis IMU (BNO085)"
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
