import SensorsSkeleton from "./sensors-skeleton"
import { bentoIconSize } from "../../../utils/constants"
import LEDColorChangeAnimation from "../../icon-animations/led-color-change-animation"

export default function LEDCard() {
	return (
		<SensorsSkeleton
			title="5× RGB LEDs"
			description="Create dazzling light displays and visual indicators"
			icon={<LEDColorChangeAnimation iconSize={bentoIconSize} />}
			outerDivStyles="row-start-1 col-start-1"
		/>
	)
}
