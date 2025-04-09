import { observer } from "mobx-react"
import { Slider } from "../../../shadcn/ui/slider"
import { useGarageContext } from "../../../../contexts/garage-context"

function AdjustMaxDrivingSpeed() {
	const garageClass = useGarageContext()

	const handleValueChange = (value: number[]) => {
		const newMaxSpeed = value[0]

		// Update state immediately for responsive UI
		garageClass.setMotorThrottlePercent(newMaxSpeed)
		// No need for separate socket emission - the hook will handle it
	}

	// Handle key down event to prevent arrow keys from changing slider value
	const handleKeyDown = (event: React.KeyboardEvent) => {
		// Prevent arrow keys from changing slider value
		if (
			event.key === "ArrowUp" ||
			event.key === "ArrowDown" ||
			event.key === "ArrowLeft" ||
			event.key === "ArrowRight"
		) {
			event.preventDefault()
		}
	}

	return (
		<div className="w-full">
			<div className="flex flex-col">
				<div className="text-base">{garageClass.motorThrottlePercent}%</div>
				<div
					className="cursor-pointer mt-3"
					onKeyDown={handleKeyDown}
					tabIndex={0} // Make div focusable to capture key events
				>
					<Slider
						defaultValue={[garageClass.motorThrottlePercent]}
						max={100}
						step={1}
						onValueChange={handleValueChange}
						className="duration-0"
						value={[garageClass.motorThrottlePercent]}
						onKeyDown={handleKeyDown} // Add key handler directly to Slider
					/>
				</div>
			</div>
		</div>
	)
}

export default observer(AdjustMaxDrivingSpeed)
