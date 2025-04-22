"use client"

import { WORKBENCH_ROUNDING_RADIUS } from "../../../utils/constants"
import DemosSection from "./demos-section"
import SoundsSection from "./sounds/sounds-section"

export default function SoundsAndDemosSection() {
	return (
		<div className="h-1/3 flex flex-row overflow-hidden">
			<div
				className="w-3/5 flex flex-col items-center justify-center border-t border-r p-10"
				style={{ borderTopRightRadius: WORKBENCH_ROUNDING_RADIUS }}
			>
				<SoundsSection />
			</div>
			<div
				className="w-2/5 flex flex-col items-start justify-center border-t border-r border-l"
				style={{ borderTopRightRadius: WORKBENCH_ROUNDING_RADIUS, borderTopLeftRadius: WORKBENCH_ROUNDING_RADIUS }}
			>
				<DemosSection />
			</div>
		</div>
	)
}
