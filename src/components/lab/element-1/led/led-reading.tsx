import { useMemo } from "react"
import { observer } from "mobx-react"
import { usePipContext } from "../../../../contexts/pip-context"
import LabReadingComponent from "../../reading/lab-reading-component"
import LEDColorChangeAnimation from "../../../icon-animations/led-color-change-animation"

function LedReading() {
	const pipClass = usePipContext()

	const nextPageLink = useMemo((): LabPages => {
		if (pipClass.doesUserHaveAPip) return "/lab/element-1/led/demo"
		return "/lab/element-1/led/video"
	}, [pipClass.doesUserHaveAPip])

	const nextPageActivity = useMemo((): ActivityType => {
		if (pipClass.doesUserHaveAPip) return "Demo"
		return "Video"
	}, [pipClass.doesUserHaveAPip])

	return (
		<LabReadingComponent
			readingTitle="What is an LED?"
			previousPageLink={null}
			previousPageActivity={null}
			nextPageLink={nextPageLink}
			nextPageActivity={nextPageActivity}
			element={1}
			lessonIcon={<LEDColorChangeAnimation iconSize={30} />}
			lessonProgressPercent={100 / 6}
		/>
	)
}

export default observer(LedReading)
