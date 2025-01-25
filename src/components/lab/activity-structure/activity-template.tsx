import { ReactElement } from "react"
import ActivityHeader from "./activity-header"
import ActivityFooter from "./activity-footer"
import { cn } from "../../../lib/shadcn/utils"

interface Props {
    lessonTitle: string
    previousPageLink: LabPages | null
    previousPageActivity: ActivityType | null
    nextPageLink: LabPages
    nextPageActivity: ActivityType
    element: 1 | 2 | 3
	lessonIcon: ReactElement | null
	progressPercent: number
	children: React.ReactNode
	extraClasses?: string
    isNextPageDemo?: boolean
}

export default function ActivityTemplate(props: Props) {
	const {
		lessonTitle,
		previousPageLink,
		previousPageActivity,
		nextPageLink,
		nextPageActivity,
		element,
		lessonIcon,
		progressPercent,
		children,
		extraClasses = "",
		isNextPageDemo = false
	} = props
	return (
		<div className={cn("flex flex-col", extraClasses)}>
			<ActivityHeader
				element={element}
				lessonTitle={lessonTitle}
				lessonIcon={lessonIcon}
				progressPercent={progressPercent}
			/>

			{ children }

			<ActivityFooter
				previousPageLink={previousPageLink}
				previousPageActivity={previousPageActivity}
				nextPageLink={nextPageLink}
				nextPageActivity={nextPageActivity}
				isNextPageDemo={isNextPageDemo}
			/>
		</div>
	)
}
