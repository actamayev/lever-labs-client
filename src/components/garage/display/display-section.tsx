"use client"

import RenderDisplay from "./render-display"
import DisplayControls from "./display-controls"
import { WORKBENCH_ROUNDING_RADIUS } from "../../../utils/constants/constants"

export default function DisplaySection() {
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
				<RenderDisplay />
			</div>
		</div>
	)
}
