"use client"

import DemosSection from "./demos-section"
import SoundsSection from "./sounds/sounds-section"

export default function SoundsAndDemosSection() {
	return (
		<div className="h-1/3 flex flex-row overflow-hidden">
			<div className="w-3/5 flex flex-col items-center justify-center border-t border-r rounded-tr-3xl">
				<SoundsSection />
			</div>
			<div className="w-2/5 flex flex-col items-start justify-center border-t border-r border-l rounded-tr-3xl rounded-tl-3xl">
				<DemosSection />
			</div>
		</div>
	)
}
