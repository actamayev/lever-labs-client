import { useCallback } from "react"
// import { CustomMotor } from "../../icons/custom-motor"
import { CustomLightbulb } from "../../icons/custom-lightbulb"
import LessonsIconListTooltip from "./lessons-icon-list-tooltip"

interface Lesson {
	tooltipMessage: Element1Lessons
	icon: React.ReactNode
}

interface SectionRefs {
	[key: string]: React.RefObject<HTMLDivElement>
}

interface SeeLessonIconsProps {
	sectionRefs: SectionRefs
	activeSection: Element1Lessons
	setClickedSection: (section: Element1Lessons) => void
}

export default function SeeLessonIconsInElement({
	sectionRefs,
	activeSection,
	setClickedSection
}: SeeLessonIconsProps) {
	const scrollToSection = useCallback((sectionName: Element1Lessons) => {
		setClickedSection(sectionName)
		const ref = sectionRefs[sectionName]
		if (!ref.current) return
		ref.current.scrollIntoView({
			behavior: "smooth",
			block: "start",
			inline: "start"
		})
	}, [sectionRefs, setClickedSection])

	const lessons: Lesson[] = [
		{
			tooltipMessage: "LED",
			icon: <CustomLightbulb className="!w-8 !h-8" />
		},
		// {
		// 	tooltipMessage: "Motor",
		// 	icon: <CustomMotor className="!w-8 !h-8" />
		// }
	]

	return (
		<div className="flex gap-2">
			{lessons.map(lesson => (
				<LessonsIconListTooltip
					key={lesson.tooltipMessage}
					tooltipMessage={lesson.tooltipMessage}
					onClick={() => scrollToSection(lesson.tooltipMessage)}
					isActive={activeSection === lesson.tooltipMessage}
				>
					{lesson.icon}
				</LessonsIconListTooltip>
			))}
		</div>
	)
}
