import { useMemo } from "react"
import { observer } from "mobx-react"
import { usePipContext } from "../../../../contexts/pip-context"
import LabVideoComponent from "../../video/lab-video-component"
import LEDColorChangeAnimation from "../../../icon-animations/led-color-change-animation"

function LedVideo() {
	const pipClass = usePipContext()

	const previousPageLink = useMemo((): LabPages => {
		if (pipClass.doesUserHaveAPip) return "/lab/element-1/led/demo"
		return "/lab/element-1/led/reading"
	}, [pipClass.doesUserHaveAPip])

	const previousPageActivity = useMemo((): ActivityType => {
		if (pipClass.doesUserHaveAPip) return "Demo"
		return "Reading"
	}, [pipClass.doesUserHaveAPip])

	return (
		<LabVideoComponent
			videoTitle="How LEDs work"
			ytVideoId="Iwv5momDiKQ"
			ytVideoTitle="How does an LED work"
			previousPageLink={previousPageLink}
			previousPageActivity={previousPageActivity}
			nextPageLink="/lab/element-1/led/code-1"
			nextPageActivity="Code"
			element={1}
			lessonIcon={<LEDColorChangeAnimation iconSize={30} />}
			progressPercent={300 / 6}
		/>
	)
}

export default observer(LedVideo)
