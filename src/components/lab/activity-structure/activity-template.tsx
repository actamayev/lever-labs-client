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
	element: ElementNumbers
	lessonIcon: ReactElement | null
	progressPercent: number
	children: React.ReactNode
	extraClasses?: string
	isCode?: boolean
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
		isCode = false
	} = props
	return (
		<div className={cn("flex flex-col h-screen min-h-0", extraClasses)}>
			<ActivityHeader
				element={element}
				lessonTitle={lessonTitle}
				lessonIcon={lessonIcon}
				progressPercent={progressPercent}
				isCode={isCode}
			/>

			<div className="flex-1 min-h-0 pt-20 pb-20">
				{children}
			</div>

			<ActivityFooter
				previousPageLink={previousPageLink}
				previousPageActivity={previousPageActivity}
				nextPageLink={nextPageLink}
				nextPageActivity={nextPageActivity}
			/>
		</div>
	)
}
