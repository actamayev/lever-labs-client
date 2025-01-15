import { useState } from "react"
import { FaTachometerAlt } from "react-icons/fa"
import SensorsSkeleton from "./sensors-skeleton"
import { bentoIconSize } from "../../../utils/constants"
import { DottedTextTooltip } from "../../dotted-underline-text"
import { cn } from "../../../lib/shadcn/utils"

const vibrationStyles = `
  @keyframes vibrate {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(-2deg); }
    75% { transform: rotate(2deg); }
    100% { transform: rotate(0deg); }
  }
`

export default function IMUCard() {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<>
			<style>{vibrationStyles}</style>
			<SensorsSkeleton
				title={(
					<>
						9-Axis&nbsp;
						<DottedTextTooltip tooltipMessage="BNO085">
							IMU
						</DottedTextTooltip>
					</>
				)}
				description="Seemlessly track orientation, acceleration, and motion"
				icon={
					<div
						className="w-fit group"
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
					>
						<FaTachometerAlt
							className={cn(
								"origin-center text-black dark:text-white transform",
								isHovered ? "animate-[vibrate_100ms_ease-in-out_infinite]" : ""
							)}
							size={bentoIconSize}
						/>
					</div>
				}
				outerDivStyles="row-start-1 col-start-2 col-end-2"
			/>
		</>
	)
}
