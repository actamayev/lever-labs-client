"use client"

import { observer } from "mobx-react"
import ArrowKeyButton from "./arrow-key-button"
import DrivingActionButton from "./driving-action-button"
import AdjustDrivingSpeed from "./adjust-driving-speed"
import garageClass from "../../../classes/garage-class"
import useEffectMotorDrive from "../../../hooks/garage/use-effect-motor-drive"
import useGarageActionsUseEffect from "../../../hooks/garage/use-garage-actions-use-effect"

function DrivingControls(): React.ReactNode {
	useEffectMotorDrive()
	useGarageActionsUseEffect()

	return (
		<div className="flex flex-row items-center justify-between gap-8">
			<div className="grid grid-cols-3 gap-5">
				{/* Top row - Headlights button, Up button, Horn button */}
				<div className="col-start-1">
					<DrivingActionButton
						action="headlights"
						isPressed={garageClass.areHeadlightsOn}
					/>
				</div>
				<div className="col-start-2">
					<ArrowKeyButton direction="up"/>
				</div>
				<div className="col-start-3">
					<DrivingActionButton
						action="horn"
						isPressed={garageClass.isHornPressed}
					/>
				</div>

				{/* Middle row with explicit column positioning */}
				<div className="col-start-1">
					<ArrowKeyButton direction="left" />
				</div>

				<div className="col-start-2">
					<ArrowKeyButton direction="down" />
				</div>

				<div className="col-start-3">
					<ArrowKeyButton direction="right" />
				</div>
			</div>

			<AdjustDrivingSpeed />
		</div>
	)
}

export default observer(DrivingControls)
