import { useState } from "react"
import { TvMinimal } from "lucide-react"
import SensorsSkeleton from "./sensors-skeleton"
import { bentoIconSize } from "../../../utils/constants"

export default function ScreenCard() {
	const [isHovered, setIsHovered] = useState(false)

	const ScreenIcon = () => {
		return (
			<div
				className="relative"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<TvMinimal size={bentoIconSize} />

				{isHovered && (
					<div
						className="absolute bg-blue-500 rounded-full transition-all duration-300"
						style={{
							width: "15px",
							height: "15px",
							top: "41%",
							left: "50%",
							transform: "translate(-50%, -50%)",
						}}
					/>
				)}
			</div>
		)
	}

	return (
		<SensorsSkeleton
			title="OLED Screen"
			description="Display for text and graphics"
			icon={<ScreenIcon />}
			outerDivStyles="col-span-1 lg:col-span-1 lg:col-start-3 lg:row-start-4"
		/>
	)
}
