import LabStartComponent from "../start/lab-start-component"

export default function Element1Start() {
	return (
		<LabStartComponent
			startTitle="Element 1 Start"
			previousPageLink={null}
			previousPageActivity={null}
			nextPageLink="/lab/element-1/led/reading"
			nextPageActivity="Reading"
			element={1}
			lessonIcon={null}
			progressPercent={20}
			isNextPageDemo={true}
		/>
	)
}
