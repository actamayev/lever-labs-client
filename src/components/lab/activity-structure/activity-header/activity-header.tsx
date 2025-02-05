import { X } from "lucide-react"
import isNull from "lodash-es/isNull"
import { Button } from "../../../shadcn/ui/button"
import LabCodePipStatus from "./lab-code-pip-status"
import ReadingProgressBar from "./reading-progress-bar"
import GetLessonIconFromActivityName from "./get-lesson-icon-from-name"
import useTypedNavigate from "../../../../hooks/navigate/typed-navigate"
import LessonProgressIconContainer from "./lesson-progress-icon-container"

interface Props {
	element: ElementNumbers
	activityTitle: string
	lessonTitle: Element1Lessons
	lessonProgressPercent: number | null
	activityType: ActivityType
}

export default function ActivityHeader(props: Props) {
	const { element, lessonTitle, activityTitle, lessonProgressPercent, activityType } = props
	const navigate = useTypedNavigate()

	return (
		<header
			className="h-20 flex items-center justify-between px-3 border-b-2
			border-zinc-300 dark:border-zinc-700 fixed top-0 left-0 right-0 bg-white dark:bg-zinc-900 z-10"
		>
			<div className="w-1/3">
				<div className="flex items-center">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => navigate(`/lab/element-${element}`)}
						className="!p-6 dark:hover:bg-zinc-800"
					>
						<X className="!h-6 !w-6" />
					</Button>
					<h2 className="text-4xl font-semibold ml-9">{activityTitle}</h2>
				</div>
			</div>

			<div className="w-1/3 flex justify-center">
				{activityType === "Reading" && (
					<ReadingProgressBar />
				)}
			</div>

			<div className="w-1/3 flex justify-end">
				{(activityType === "Code" || activityType === "Demo") && (
					<div className="mr-6">
						<LabCodePipStatus />
					</div>
				)}
				<div className="flex justify-end mr-4">
					{!isNull(lessonProgressPercent) && (
						<LessonProgressIconContainer
							icon={<GetLessonIconFromActivityName lessonTitle={lessonTitle} />}
							lessonProgressPercent={lessonProgressPercent}
							lessonTitle={lessonTitle}
						/>
					)}
				</div>
			</div>
		</header>
	)
}
