"use client"

import MotorSpinAnimation from "../../../icon-animations/motor-spin-animation"
import LEDColorChangeAnimation from "../../../icon-animations/led-color-change-animation"

export default function GetLessonIconFromActivityName({ lessonTitle } : { lessonTitle: LessonNames }) {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (lessonTitle === "LED") {
		return <LEDColorChangeAnimation iconSize={30} />
	}
	return <MotorSpinAnimation iconSize={30} />
}
