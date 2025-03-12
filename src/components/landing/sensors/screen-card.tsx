import SensorsSkeleton from "./sensors-skeleton"
import { bentoIconSize } from "../../../utils/constants"
import { TvMinimal } from "lucide-react"

export default function ScreenCard() {
	return (
		<SensorsSkeleton
			title="OLED Screen"
			description="128×64 pixel display for text and graphics output"
			icon={<TvMinimal size={bentoIconSize}/>}
			outerDivStyles="col-span-1 md:col-span-2 lg:col-span-2 lg:col-start-1 row-start-4"
			paragraphStyles="whitespace-normal lg:whitespace-nowrap"
		/>
	)
}
