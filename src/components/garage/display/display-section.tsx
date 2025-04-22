"use client"

import { WORKBENCH_ROUNDING_RADIUS } from "../../../utils/constants"

export default function DisplaySection() {
	return (
		<div
			className="h-1/3 overflow-hidden border-t border-r border-b"
			style={{
				borderTopRightRadius: WORKBENCH_ROUNDING_RADIUS,
				borderBottomRightRadius: WORKBENCH_ROUNDING_RADIUS
			}}
		>
		</div>
	)
}
