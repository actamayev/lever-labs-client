import { CustomMotor } from "../../icons/custom-motor"
import { CustomLightbulb } from "../../icons/custom-lightbulb"
import LessonsIconListTooltip from "./lessons-icon-list-tooltip"

interface Lesson {
	tooltipMessage: string
	icon: React.ReactNode
}

const lessons: Lesson[] = [
	{
		tooltipMessage: "LED",
		icon: <CustomLightbulb className="!w-8 !h-8" />
	},
	{
		tooltipMessage: "Motor",
		icon: <CustomMotor className="!w-8 !h-8" />
	}
]

export default function SeeLessonIconsInElement() {
	return (
		<div className="flex gap-2">
			{lessons.map(lesson => (
				<LessonsIconListTooltip
					key={lesson.tooltipMessage}
					tooltipMessage={lesson.tooltipMessage}
				>
					{lesson.icon}
				</LessonsIconListTooltip>
			))}
		</div>
	)
}
