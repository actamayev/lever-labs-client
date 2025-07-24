"use client"

import { useState } from "react"
import DisplayColumn from "./display-column"
import ControlsColumn from "./controls-column"
import { WORKBENCH_ROUNDING_RADIUS } from "../../../utils/constants/constants"
import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from "../../../utils/constants/display-constants"

export default function DisplaySection() {
	const [pixelBuffer, setPixelBuffer] = useState<boolean[][]>(() =>
		Array(DISPLAY_HEIGHT).fill(null).map(() => Array(DISPLAY_WIDTH).fill(false))
	)
	return (
		<div
			className="h-1/3 overflow-hidden border-t border-r border-b"
			style={{
				borderTopRightRadius: WORKBENCH_ROUNDING_RADIUS,
				borderBottomRightRadius: WORKBENCH_ROUNDING_RADIUS
			}}
		>
			<div className="flex items-center justify-center bg-standardBackground text-white">
				<div className="grid grid-cols-2 items-center">
					<ControlsColumn setPixelBuffer={setPixelBuffer} />
					<DisplayColumn pixelBuffer={pixelBuffer}/>
				</div>
			</div>
		</div>
	)
}
