"use client"

import { observer } from "mobx-react"
import RenderDisplay from "./render-display"
import DisplayControls from "./display-controls"
import getGarageClass from "../../../classes/garage-class"
import { WORKBENCH_ROUNDING_RADIUS } from "../../../utils/constants/constants"

function DisplaySection(): React.ReactNode {
	return (
		<div
			className="h-1/3 overflow-hidden border-t border-r border-b"
			style={{
				borderTopRightRadius: WORKBENCH_ROUNDING_RADIUS,
				borderBottomRightRadius: WORKBENCH_ROUNDING_RADIUS
			}}
		>
			<div className="w-full grid grid-cols-2 pt-10 ml-[18px]">
				<DisplayControls />
				<RenderDisplay pixelBuffer={getGarageClass().pixelBuffer} />
			</div>
		</div>
	)
}

export default observer(DisplaySection)
