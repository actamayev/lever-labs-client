import SensorsSkeleton from "./sensors-skeleton"
import { bentoIconSize } from "../../../utils/constants"
import { TvMinimal } from "lucide-react"

export default function ScreenCard() {
	return (
		<SensorsSkeleton
			title="OLED Screen"
			description="Display for text and graphics"
			icon={<TvMinimal size={bentoIconSize}/>}
			outerDivStyles="col-span-1 lg:col-span-1 lg:col-start-3 lg:row-start-4"
			// paragraphStyles="whitespace-normal lg:whitespace-nowrap"
		/>
	)
}
