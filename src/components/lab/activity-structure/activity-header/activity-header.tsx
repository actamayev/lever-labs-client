import { BookOpen, X } from "lucide-react"
import { ReactElement } from "react"
import isNull from "lodash-es/isNull"
import isUndefined from "lodash-es/isUndefined"
import { Button } from "../../../shadcn/ui/button"
import LabCodePipStatus from "./lab-code-pip-status"
import ReadingProgressBar from "./reading-progress-bar"
import useTypedNavigate from "../../../../hooks/navigate/typed-navigate"
import LessonProgressIconContainer from "./lesson-progress-icon-container"
import ActivityProgressIconContainer from "./activity-progress-icon-container"

interface Props {
	element: ElementNumbers
	lessonTitle: string
	lessonIcon: ReactElement | null
	lessonProgressPercent: number | null
	activityType: ActivityType
	readingProgressPercentage?: number
}
export default function ActivityHeader(props: Props) {
	const { element, lessonTitle, lessonIcon, lessonProgressPercent, activityType, readingProgressPercentage } = props
	const navigate = useTypedNavigate()

	return (
		<header
			className="h-20 flex items-center justify-between px-4 border-b-2
			border-zinc-300 dark:border-zinc-700 fixed top-0 left-0 right-0 bg-white dark:bg-zinc-900 z-10"
		>
			<div className="flex items-center w-32">
				<div className="flex items-center justify-start duration-100 rounded-2xl cursor-pointer w-full">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => navigate(`/lab/element-${element}`)}
						className="!p-6 dark:hover:bg-zinc-800"
					>
						<X className="!h-6 !w-6" />
					</Button>
				</div>
				{activityType === "Reading" && (!isUndefined(readingProgressPercentage)) && (
					<ActivityProgressIconContainer
						icon={<BookOpen />}
						activityProgressPercent={readingProgressPercentage}
					/>
				)}
			</div>

			<div className="flex-1 flex flex-col items-center justify-center space-y-0">
				<h2 className="text-4xl font-semibold mb-2">{lessonTitle}</h2>
				{(activityType === "Reading") && (!isUndefined(readingProgressPercentage)) && (
					<div className="w-1/4">  {/* Changed to 1/4 width */}
						<ReadingProgressBar readingProgressPercentage={readingProgressPercentage}/>
					</div>
				)}
			</div>

			<div className="flex items-center w-32">
				{activityType.includes("Code") && <div className="mr-4"><LabCodePipStatus /></div>}
				<div className="flex justify-end ml-auto mr-4">
					{lessonIcon && !isNull(lessonProgressPercent) && (
						<LessonProgressIconContainer
							icon={lessonIcon}
							lessonProgressPercent={lessonProgressPercent}
						/>
					)}
				</div>
			</div>
		</header>
	)
}
