"use client"

import { observer } from "mobx-react"
import ArrowKeyButton from "./arrow-key-button"
import DrivingActionButton from "./driving-action-button"
import AdjustMaxDrivingSpeed from "./adjust-max-driving-speed"
import { useGarageContext } from "../../../../contexts/garage-context"
import useMotorDriveUseEffect from "../../../../hooks/garage/motor-drive-use-effect"
import useGarageActionsUseEffect from "../../../../hooks/garage/garage-actions-use-effect"

function DrivingControls() {
	useMotorDriveUseEffect()
	useGarageActionsUseEffect()
	const garageClass = useGarageContext()

	return (
		<div className="flex flex-row items-center justify-between gap-8 border-2 p-4 rounded-xl border-hare">
			<div className="grid grid-cols-3 gap-[21px]">
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

			<AdjustMaxDrivingSpeed />
		</div>
	)
}

export default observer(DrivingControls)
