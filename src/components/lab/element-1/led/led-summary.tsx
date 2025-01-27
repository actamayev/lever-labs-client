import LEDColorChangeAnimation from "../../../icon-animations/led-color-change-animation"
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
			lessonIcon={<LEDColorChangeAnimation iconSize={30} />}
			progressPercent={100}
		/>
	)
}
