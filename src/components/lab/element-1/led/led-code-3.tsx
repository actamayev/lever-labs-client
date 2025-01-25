import LabCodeComponent from "../../code/lab-code-component"
import LEDColorChangeAnimation from "../../../icon-animations/led-color-change-animation"

export default function LedCode3() {
	return (
		<LabCodeComponent
			codeTitle="LED Code 3"
			previousPageLink="/lab/element-1/led/code-2"
			previousPageActivity="Code"
			nextPageLink="/lab/element-1/motor/demo"
			nextPageActivity="Demo"
			element={1}
			lessonIcon={<LEDColorChangeAnimation iconSize={30} />}
			progressPercent={100}
		/>
	)
}
