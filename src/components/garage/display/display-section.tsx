"use client"

import { useState } from "react"
import DisplayColumn from "./display-column"
import ControlsColumn from "./controls-column"
import { WORKBENCH_ROUNDING_RADIUS } from "../../../utils/constants/constants"
import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from "../../../utils/constants/display-constants"

export default function DisplaySection() {
	const [pixelBuffer, setPixelBuffer] = useState<PixelBuffer>(() =>
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
			<div className="w-full grid grid-cols-2 gap-2 pt-10 ml-[18px]">
				<ControlsColumn setPixelBuffer={setPixelBuffer} />
				<DisplayColumn pixelBuffer={pixelBuffer}/>
			</div>
		</div>
	)
}
