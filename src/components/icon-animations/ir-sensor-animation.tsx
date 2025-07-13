"use client"

import { CustomRemote } from "../icons/custom-remote"
import { bentoIconSize } from "../../utils/constants/constants"

export default function IRSensorAnimation() {
	return (
		<div className="cursor-pointer">
			<CustomRemote
				size={bentoIconSize}
				className="transition-colors duration-300 text-questionText"
			/>
		</div>
	)
}
