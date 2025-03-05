import LabSummaryComponent from "../../summary/lab-summary-component"

export default function LedSummary() {
	return (
		<LabSummaryComponent
			previousPageLink="/lab/element-1/led/code/warehouse-pip"
			previousPageActivity="Code"
			previousPageTooltip="Warehouse Pip"
			nextPageLink={null}
			nextPageActivity={null}
			nextPageTooltip={null}
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={100}
		/>
	)
}
