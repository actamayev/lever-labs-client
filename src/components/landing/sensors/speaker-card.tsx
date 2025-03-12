import { Volume2 } from "lucide-react"
import SensorsSkeleton from "./sensors-skeleton"
import { bentoIconSize } from "../../../utils/constants"

export default function SpeakerCard() {
	return (
		<SensorsSkeleton
			title="Built-in Speaker"
			description="Play sounds, music, and voice feedback for interactive experiences"
			icon={<Volume2 size={bentoIconSize}/>}
			outerDivStyles="col-span-1 lg:col-span-1 lg:col-start-3 lg:row-start-4"
			paragraphStyles="whitespace-normal lg:whitespace-nowrap"
		/>
	)
}
