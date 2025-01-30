import LabSummaryComponent from "../../summary/lab-summary-component"

export default function LedSummary() {
	return (
		<LabSummaryComponent
			summaryTitle="LED Summary"
			previousPageLink="/lab/element-1/led/code-3"
			previousPageActivity="Code"
			nextPageLink="/lab/element-1/motor/demo"
			nextPageActivity="Demo"
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={100}
		/>
	)
}
