import { useCallback } from "react"
import { observer } from "mobx-react"
import { Slider } from "../../../shadcn/ui/slider"
import { cn } from "../../../../lib/shadcn/utils"
import { useWorkbenchContext } from "../../../../contexts/workbench-context"

function AdjustVolume() {
	const workbenchClass = useWorkbenchContext()

	const handleVolumeChange = useCallback((value: number[]) => {
		workbenchClass.setVolume(value[0])
		if (workbenchClass.isMuted && value[0] > 0) {
			workbenchClass.setIsMuted(false)
		}
	}, [workbenchClass])

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
		<div
			className="cursor-pointer h-full flex flex-col justify-center"
			onKeyDown={handleKeyDown}
			tabIndex={0}
		>
			<Slider
				defaultValue={[workbenchClass.volume]}
				max={100}
				step={1}
				onValueChange={handleVolumeChange}
				className={cn("duration-0", workbenchClass.isMuted ? "opacity-50" : "")}
				value={[workbenchClass.volume]}
				onKeyDown={handleKeyDown} // Add key handler directly to Slider
				orientation="vertical"
				unFilledTrackColor="bg-sandboxOrange/20 dark:bg-sandboxOrange/80"
				filledTrackColor="bg-sandboxOrange"
				thumbBorderColor="border-sandboxOrange"
			/>
		</div>
	)
}

export default observer(AdjustVolume)
