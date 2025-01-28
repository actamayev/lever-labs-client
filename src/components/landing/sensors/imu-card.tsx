import SensorsSkeleton from "./sensors-skeleton"
import { bentoIconSize } from "../../../utils/constants"
import CompassRotationAnimation from "../../icon-animations/compass-rotation-animation"

export default function IMUCard() {
	return (
		<SensorsSkeleton
			title="9-Axis IMU"
			description="Seemlessly track orientation, acceleration, and motion"
			icon={<CompassRotationAnimation iconSize={bentoIconSize}/>}
			outerDivStyles="row-start-1 col-start-2 col-end-2"
		/>
	)
}
