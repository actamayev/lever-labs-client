import MotorSpinAnimation from "../../../icon-animations/motor-spin-animation"
import LabSummaryComponent from "../../summary/lab-summary-component"

export default function MotorSummary() {
	return (
		<LabSummaryComponent
			summaryTitle="Motor Summary"
			previousPageLink="/lab/element-1/motor/code-3"
			previousPageActivity="Code"
			nextPageLink="/lab/element-1/led/reading"
			nextPageActivity="Reading"
			element={1}
			lessonIcon={<MotorSpinAnimation iconSize={30} />}
			lessonProgressPercent={100}
		/>
	)
}
