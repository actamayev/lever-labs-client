import SensorsSkeleton from "./sensors-skeleton"
import { bentoIconSize } from "../../../utils/constants"
import CompassRotationAnimation from "../../icon-animations/compass-rotation-animation"

export default function IMUCard() {
	return (
		<SensorsSkeleton
			title="9-Axis IMU"
			description="Seamlessly track orientation, acceleration, and motion"
			icon={<CompassRotationAnimation iconSize={bentoIconSize}/>}
			outerDivStyles="col-span-1 lg:col-start-2 lg:row-start-1"
		/>
	)
}
