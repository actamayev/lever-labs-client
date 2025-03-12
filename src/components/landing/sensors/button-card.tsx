import SensorsSkeleton from "./sensors-skeleton"
import { bentoIconSize } from "../../../utils/constants"
import ButtonSpringAnimation from "../../icon-animations/button-spring-animation"

export default function ButtonCard() {
	return (
		<SensorsSkeleton
			title="2× Buttons"
			description="Give your Pip custom controls"
			icon={<ButtonSpringAnimation iconSize={bentoIconSize}/>}
			outerDivStyles="col-span-1 lg:col-start-1 lg:row-start-3"
		/>
	)
}
