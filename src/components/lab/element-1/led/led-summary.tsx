import LabSummaryComponent from "../../summary/lab-summary-component"

export default function LedSummary() {
	return (
		<LabSummaryComponent
			summaryTitle="LED Summary"
			previousPageLink="/lab/element-1/led/code/warehouse-pip"
			previousPageActivity="Code"
			nextPageLink={null}
			nextPageActivity={null}
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={100}
		/>
	)
}
