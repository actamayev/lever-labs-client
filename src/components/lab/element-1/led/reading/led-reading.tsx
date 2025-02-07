import LabReadingComponent from "../../../reading/lab-reading-component"

export default function LedReading() {
	return (
		<LabReadingComponent
			readingTitle="What is an LED?"
			previousPageLink="/lab/element-1/led/demo"
			previousPageActivity="Demo"
			nextPageLink="/lab/element-1/led/video"
			nextPageActivity="Video"
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={100 / 6}
		/>
	)
}
