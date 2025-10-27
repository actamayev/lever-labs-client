"use client"

import { observer } from "mobx-react"
import { Slider } from "../../ui/slider"
import garageClass from "../../../classes/garage-class"
import { cn } from "../../../lib/shadcn/utils"
import CustomTooltip from "../../custom-tooltip"

// Helper function to get slider colors based on disabled state
const getSliderColors = (isDisabled: boolean): {
	unFilledTrackColor: string
	filledTrackColor: string
	thumbBorderColor: string
	thumbDetailColor: string
} => ({
	unFilledTrackColor: isDisabled ? "bg-gray-300" : "bg-blue-100",
	filledTrackColor: isDisabled ? "bg-gray-500" : "bg-blue-800",
	thumbBorderColor: isDisabled ? "border-gray-500" : "border-blue-800",
	thumbDetailColor: isDisabled ? "bg-gray-600" : "bg-blue-900"
})

function AdjustDrivingSpeed(): React.ReactNode {
	// Check if driving should be disabled
	const isDisabled = !garageClass.garageDrivingStatus
	const colors = getSliderColors(isDisabled)

	const handleValueChange = (value: number[]): void => {
		// Only allow changes if not disabled
		if (isDisabled) return
		const newMaxSpeed = value[0]
		garageClass.setMotorThrottlePercent(newMaxSpeed)
	}

	const handleKeyDown = (event: React.KeyboardEvent): void => {
		if (
			event.key === "ArrowUp" ||
			event.key === "ArrowDown" ||
			event.key === "ArrowLeft" ||
			event.key === "ArrowRight"
		) {
			event.preventDefault()
		}
	}

	const sliderContent = (
		<div className="relative h-full">
			<div
				className={cn(
					"h-full flex flex-col justify-center",
					isDisabled ? "cursor-not-allowed" : "cursor-pointer"
				)}
				onKeyDown={handleKeyDown}
				tabIndex={0}
			>
				<div className="h-full relative">
					<Slider
						defaultValue={[garageClass.motorThrottlePercent]}
						max={100}
						step={1}
						onValueChange={handleValueChange}
						className={cn("h-full duration-0", isDisabled && "opacity-50")}
						value={[garageClass.motorThrottlePercent]}
						onKeyDown={handleKeyDown}
						orientation="vertical"
						size={80}
						roundLevel="rounded-xl"
						thumbHeight={80 / 3}
						thumbWidth={80}
						unFilledTrackColor={colors.unFilledTrackColor}
						filledTrackColor={colors.filledTrackColor}
						thumbBorderColor={colors.thumbBorderColor}
						thumbDetails={
							<>
								<div className={cn(
									"w-2/3 h-0.5 rounded-full mb-1",
									colors.thumbDetailColor
								)}></div>
								<div className={cn(
									"w-3/4 h-0.5 rounded-full mb-1",
									colors.thumbDetailColor
								)}></div>
								<div className={cn(
									"w-2/3 h-0.5 rounded-full",
									colors.thumbDetailColor
								)}></div>
							</>
						}
						disabled={isDisabled}
					/>
				</div>
			</div>
			{/* Tooltip overlay only when disabled */}
			{isDisabled && (
				<CustomTooltip
					tooltipTrigger={
						<div className="absolute inset-0 cursor-not-allowed" />
					}
					tooltipContent="Driving disabled by teacher"
				/>
			)}
		</div>
	)

	// Wrap with tooltip only when enabled
	if (!isDisabled) {
		return (
			<CustomTooltip
				tooltipTrigger={sliderContent}
				tooltipContent="Adjust driving speed"
			/>
		)
	}

	// Return without tooltip wrapper when disabled (tooltip is handled by overlay)
	return sliderContent
}

export default observer(AdjustDrivingSpeed)
