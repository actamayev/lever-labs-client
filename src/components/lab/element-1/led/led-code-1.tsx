import LabCodeComponent from "../../code/lab-code-component"
import LEDColorChangeAnimation from "../../../icon-animations/led-color-change-animation"

export default function LedCode1() {
	return (
		<LabCodeComponent
			codeTitle="LED Code 1"
			previousPageLink="/lab/element-1/led/reading"
			previousPageActivity="Reading"
			nextPageLink="/lab/element-1/led/code-2"
			nextPageActivity="Code"
			element={1}
			lessonIcon={<LEDColorChangeAnimation iconSize={30} />}
			progressPercent={400 / 6}
		/>
	)
}
