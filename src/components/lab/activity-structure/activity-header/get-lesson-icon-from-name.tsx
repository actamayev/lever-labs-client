import MotorSpinAnimation from "../../../icon-animations/motor-spin-animation"
import LEDColorChangeAnimation from "../../../icon-animations/led-color-change-animation"

export default function GetLessonIconFromActivityName({ lessonTitle } : { lessonTitle: Element1Lessons }) {
	if (lessonTitle === "LED") {
		return <LEDColorChangeAnimation iconSize={30} />
	}
	// If Code-1, code-2, code-3
	return <MotorSpinAnimation iconSize={30} />
}
