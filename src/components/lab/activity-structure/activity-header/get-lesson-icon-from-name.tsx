import MotorSpinAnimation from "../../../icon-animations/motor-spin-animation"
import LEDColorChangeAnimation from "../../../icon-animations/led-color-change-animation"

interface Props {
	lessonTitle: Element1Lessons
	className?: string
}

export default function GetLessonIconFromActivityName(props: Props) {
	const { lessonTitle, className } = props

	if (lessonTitle === "LED") {
		return <LEDColorChangeAnimation iconSize={30} />
	}
	// If Code-1, code-2, code-3
	return <MotorSpinAnimation iconSize={30} />
}
