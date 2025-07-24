import { useState } from "react"
import DisplayColumn from "./display-column"
import ControlsColumn from "./controls-column"
import { DISPLAY_WIDTH, DISPLAY_HEIGHT } from "../../../utils/constants/display-constants"

export default function ParentDisplay() {
	// Main pixel buffer state
	const [pixelBuffer, setPixelBuffer] = useState<boolean[][]>(() =>
		Array(DISPLAY_HEIGHT).fill(null).map(() => Array(DISPLAY_WIDTH).fill(false))
	)

	return (
		<div className="flex items-center justify-center bg-standardBackground text-white">
			<div className="flex items-center">
				<div className="grid grid-cols-2 items-center">

					{/* Column 1 - Controls */}
					<ControlsColumn setPixelBuffer={setPixelBuffer} />

					{/* Column 3 - Display Preview */}
					<DisplayColumn pixelBuffer={pixelBuffer}/>
				</div>
			</div>
		</div>
	)
}
