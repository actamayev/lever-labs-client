"use client"

import { observer } from "mobx-react"
import { Slider } from "../../../shadcn/ui/slider"
import { useGarageContext } from "../../../../contexts/garage-context"

function AdjustMaxDrivingSpeed() {
	const garageClass = useGarageContext()

	const handleValueChange = (value: number[]) => {
		const newMaxSpeed = value[0]
		garageClass.setMotorThrottlePercent(newMaxSpeed)
	}

	const handleKeyDown = (event: React.KeyboardEvent) => {
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
		<div
			className="cursor-pointer h-full flex flex-col justify-center"
			onKeyDown={handleKeyDown}
			tabIndex={0}
		>
			<div className="h-full relative">
				<Slider
					defaultValue={[garageClass.motorThrottlePercent]}
					max={100}
					step={1}
					onValueChange={handleValueChange}
					className="h-full duration-0"
					value={[garageClass.motorThrottlePercent]}
					onKeyDown={handleKeyDown}
					orientation="vertical"
					size={80}
					roundLevel="rounded-xl"
					thumbHeight={80 / 3}
					thumbWidth={80}
					unFilledTrackColor="bg-blue-100"
					filledTrackColor="bg-blue-800"
					thumbBorderColor="border-blue-800"
					thumbDetails={
						<>
							<div className="w-2/3 h-0.5 bg-blue-900 rounded-full mb-1"></div>
							<div className="w-3/4 h-0.5 bg-blue-900 rounded-full mb-1"></div>
							<div className="w-2/3 h-0.5 bg-blue-900 rounded-full"></div>
						</>
					}
				/>
			</div>
		</div>
	)
}

export default observer(AdjustMaxDrivingSpeed)
