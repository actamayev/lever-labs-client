import { ReactElement } from "react"
import ActivityTemplate from "../activity-structure/activity-template"

interface Props {
	videoTitle: string
	ytVideoId: string
	ytVideoTitle: string
	previousPageLink: LabPages
	previousPageActivity: ActivityType
	nextPageLink: LabPages
	nextPageActivity: ActivityType
	element: ElementNumbers
	lessonIcon: ReactElement
	progressPercent: number
}

export default function LabVideoComponent(props: Props) {
	const {
		videoTitle,
		ytVideoId,
		ytVideoTitle,
		previousPageLink,
		previousPageActivity,
		nextPageLink,
		nextPageActivity,
		element,
		lessonIcon,
		progressPercent,
	} = props
	return (
		<ActivityTemplate
			element={element}
			lessonTitle={videoTitle}
			lessonIcon={lessonIcon}
			progressPercent={progressPercent}
			previousPageLink={previousPageLink}
			previousPageActivity={previousPageActivity}
			nextPageLink={nextPageLink}
			nextPageActivity={nextPageActivity}
			extraClasses="h-screen"
		>
			<main className="flex-1 flex items-center justify-center p-4">
				<div className="w-full max-w-4xl">
					<div className="relative aspect-video">
						<iframe
							className="w-full h-full rounded-xl"
							src={`https://www.youtube.com/embed/${ytVideoId}`}
							title={ytVideoTitle}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					</div>
				</div>
			</main>
		</ActivityTemplate>
	)
}
