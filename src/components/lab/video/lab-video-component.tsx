// import ActivityTemplate from "../activity-structure/activity-template"

// interface Props {
// 	videoTitle: string
// 	ytVideoId: string
// 	ytVideoTitle: string
// 	nextPageLink: LabPages
// 	nextPageActivity: ActivityType
// 	lessonTitle: Element1Lessons
// 	lessonProgressPercent: number
// }

// export default function LabVideoComponent(props: Props) {
// 	const {
// 		videoTitle,
// 		ytVideoId,
// 		ytVideoTitle,
// 		nextPageLink,
// 		nextPageActivity,
// 		element,
// 		lessonTitle,
// 		lessonProgressPercent,
// 	} = props
// 	return (
// 		<ActivityTemplate
// 			element={element}
// 			lessonTitle={lessonTitle}
// 			lessonProgressPercent={lessonProgressPercent}
// 			nextPageLink={nextPageLink}
// 			nextPageActivity={nextPageActivity}
// 			activityType="Video"
// 		>
// 			<main className="flex-1 flex items-center justify-center p-4">
// 				<div className="w-full max-w-4xl">
// 					<div className="relative aspect-video">
// 						<iframe
// 							className="w-full h-full rounded-xl"
// 							src={`https://www.youtube.com/embed/${ytVideoId}`}
// 							title={ytVideoTitle}
// 							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// 							allowFullScreen
// 						/>
// 					</div>
// 				</div>
// 			</main>
// 		</ActivityTemplate>
// 	)
// }
