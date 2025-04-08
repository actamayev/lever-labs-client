import { useCallback } from "react"
import round from "lodash-es/round"
import clamp from "lodash-es/clamp"
import { observer } from "mobx-react"
import isNull from "lodash-es/isNull"
import debounce from "lodash-es/debounce"
import { Slider } from "../../shadcn/ui/slider"
import { usePipContext } from "../../../contexts/pip-context"
import { useGarageContext } from "../../../contexts/garage-context"
import { useSocketContext } from "../../../contexts/socket-context"

function AdjustMaxDrivingSpeed() {
	const garageClass = useGarageContext()
	const pipClass = usePipContext()
	const socketClass = useSocketContext()

	// Create a debounced function for socket emission only
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedEmit = useCallback(
		debounce((newMaxSpeed: number) => {
			if (
				isNull(pipClass.selectedPip) ||
				pipClass.selectedPip.pipConnectionStatus === "offline"
			) return
			const adjustedMaxSpeed = clamp(round(newMaxSpeed * (255 / 100)), 0, 255)

			console.log(adjustedMaxSpeed)
			socketClass.emitNewMaxMotorSpeed({
				pipUUID: pipClass.selectedPip.pipUUID,
				newMaxSpeed: adjustedMaxSpeed
			})
		}, 10), // 10ms debounce
		[pipClass.selectedPip, socketClass] // Dependencies
	)

	// Handle both immediate state update and debounced emit
	const handleValueChange = (value: number[]) => {
		const newMaxSpeed = value[0]

		// Update state immediately for responsive UI
		garageClass.setMaxDrivingSpeed(newMaxSpeed)

		// Debounce the socket emission
		debouncedEmit(newMaxSpeed)
	}

	return (
		<div className="w-full">
			<div className="flex flex-col">
				<div>
					<div className="flex justify-between text-base">
						<div>
							Adjust max speed
						</div>
						<div>{garageClass.maxDrivingSpeed}%</div>
					</div>
				</div>
				<div className="cursor-pointer mt-3">
					<Slider
						defaultValue={[garageClass.maxDrivingSpeed]}
						max={100}
						step={1}
						onValueChange={handleValueChange}
						className="duration-0"
						value={[garageClass.maxDrivingSpeed]}
					/>
				</div>
			</div>
		</div>
	)
}

export default observer(AdjustMaxDrivingSpeed)
