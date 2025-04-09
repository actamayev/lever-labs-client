"use client"

import { observer } from "mobx-react"
import ArrowKeyButton from "./arrow-key-button"
import DrivingActionButton from "./driving-action-button"
import AdjustMaxDrivingSpeed from "./adjust-max-driving-speed"
import { useGarageContext } from "../../../../contexts/garage-context"
import useHandleArrowButtonUp from "../../../../hooks/garage/handle-arrow-button-up"
import useMotorDriveUseEffect from "../../../../hooks/garage/motor-drive-use-effect"
import useHandleArrowButtonDown from "../../../../hooks/garage/handle-arrow-button-down"
import useGarageActionsUseEffect from "../../../../hooks/garage/garage-actions-use-effect"

function DrivingControls() {
	useMotorDriveUseEffect()
	useGarageActionsUseEffect()
	const garageClass = useGarageContext()
	const handleButtonDown = useHandleArrowButtonDown()
	const handleButtonUp = useHandleArrowButtonUp()

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="grid grid-cols-3 gap-2 w-48">
				{/* Top row - Headlights button, Up button, Horn button */}
				<div className="col-start-1">
					<DrivingActionButton
						action="headlights"
						isPressed={garageClass.areHeadlightsOn}
					/>
				</div>
				<div className="col-start-2">
					<ArrowKeyButton
						direction="up"
						isPressed={garageClass.pressedMotorKeys.has("up")}
						onButtonDown={handleButtonDown}
						onButtonUp={handleButtonUp}
					/>
				</div>
				<div className="col-start-3">
					<DrivingActionButton
						action="horn"
						isPressed={garageClass.isHornPressed}
					/>
				</div>

				{/* Middle row with explicit column positioning */}
				<div className="col-start-1">
					<ArrowKeyButton
						direction="left"
						isPressed={garageClass.pressedMotorKeys.has("left")}
						onButtonDown={handleButtonDown}
						onButtonUp={handleButtonUp}
					/>
				</div>

				<div className="col-start-2">
					<ArrowKeyButton
						direction="down"
						isPressed={garageClass.pressedMotorKeys.has("down")}
						onButtonDown={handleButtonDown}
						onButtonUp={handleButtonUp}
					/>
				</div>

				<div className="col-start-3">
					<ArrowKeyButton
						direction="right"
						isPressed={garageClass.pressedMotorKeys.has("right")}
						onButtonDown={handleButtonDown}
						onButtonUp={handleButtonUp}
					/>
				</div>
			</div>

			<AdjustMaxDrivingSpeed />
		</div>
	)
}

export default observer(DrivingControls)
