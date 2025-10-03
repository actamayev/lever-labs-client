"use client"

import { observer } from "mobx-react"
import MeetPipS8P3ColorViz from "../career-quest/cq-right-components/meet-pip/meet-pip-s8-p3-color-viz"

function DemoQuestion(): React.ReactNode {
	return (
		<div className="space-y-6">
			<h2 className="text-3xl font-semibold text-questionText text-center">
				Demo: Color Sensor Visualization
			</h2>
			<div className="flex justify-center">
				<MeetPipS8P3ColorViz />
			</div>
		</div>
	)
}

export default observer(DemoQuestion)
