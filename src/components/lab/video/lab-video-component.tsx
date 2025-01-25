import { ReactElement } from "react"
import ActivityHeader from "../lab-structure/activity-header"
import ActivityFooter from "../lab-structure/activity-footer"

interface Props {
    videoTitle: string
    ytVideoId: string
    ytVideoTitle: string
    previousPageLink: LabPages
    previousPageActivity: ActivityType
    nextPageLink: LabPages
    nextPageActivity: ActivityType
    element: 1 | 2 | 3
	lessonIcon: ReactElement
	progressPercent: number
    isNextPageDemo?: boolean
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
		isNextPageDemo = false
	} = props
	return (
		<div className="h-screen flex flex-col">
			<ActivityHeader
				element={element}
				lessonTitle={videoTitle}
				lessonIcon={lessonIcon}
				progressPercent={progressPercent}
			/>

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
