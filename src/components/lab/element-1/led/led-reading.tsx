import LEDColorChangeAnimation from "../../../icon-animations/led-color-change-animation"
import LabReadingComponent from "../../reading/lab-reading-component"

export default function LedReading() {
	return (
		<LabReadingComponent
			readingTitle="How LEDs work"
			previousPageLink="/lab/element-1/start"
			previousPageActivity="Start"
			nextPageLink="/lab/element-1/led/code"
			nextPageActivity="Code"
			element={1}
			lessonIcon={<LEDColorChangeAnimation iconSize={30} />}
			progressPercent={20}
			isNextPageDemo={true}
		/>
	)
}
