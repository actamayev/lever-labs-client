import SensorsSkeleton from "./sensors-skeleton"
import { bentoIconSize } from "../../../utils/constants"
import MotorSpinAnimation from "../../icon-animations/motor-spin-animation"

export default function MotorCard() {
	return (
		<SensorsSkeleton
			title="2× Dual Hall Effect Encoders + Motors"
			description="Motors with precise position tracking for controlled movement"
			icon={<MotorSpinAnimation iconSize={bentoIconSize}/>}
			outerDivStyles="row-start-2 col-start-1 col-span-2"
			paragraphStyles="whitespace-nowrap"
		/>
	)
}
