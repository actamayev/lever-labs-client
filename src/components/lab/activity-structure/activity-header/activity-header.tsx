import isNull from "lodash-es/isNull"
import { X } from "lucide-react"
import { Button } from "../../../shadcn/ui/button"
import ReadingProgressBar from "./reading-progress-bar"
import useTypedNavigate from "../../../../hooks/navigate/typed-navigate"
import LessonProgressIconContainer from "./lesson-progress-icon-container"

interface Props {
	element: ElementNumbers
	lessonTitle: Element1Lessons
	lessonProgressPercent: number | null
	activityType: ActivityType
	isDemo?: boolean
}

export default function ActivityHeader(props: Props) {
	const {
		element,
		lessonTitle,
		lessonProgressPercent,
		activityType,
		isDemo
	} = props
	const typedNavigate = useTypedNavigate()

	return (
		<header
			className="h-20 flex items-center justify-between px-4 shadow-md
			fixed top-0 left-0 right-0 bg-white dark:bg-zinc-900 z-10"
		>
			<div className="w-1/3">
				<div className="flex items-center">
					{!isDemo && (
						<Button
							variant="ghost"
							size="icon"
							onClick={() => typedNavigate(`/lab/element-${element}`)}
							className="!p-6 dark:hover:bg-zinc-800"
						>
							<X className="!h-6 !w-6" />
						</Button>
					)}
				</div>
			</div>

			<div className="w-1/3 flex justify-center">
				{activityType === "Reading" && (
					<ReadingProgressBar />
				)}
			</div>

			<div className="w-1/3 flex justify-end">
				<div className="flex justify-end mr-4">
					{!isNull(lessonProgressPercent) && (
						<LessonProgressIconContainer
							lessonProgressPercent={lessonProgressPercent}
							lessonTitle={lessonTitle}
						/>
					)}
				</div>
			</div>
		</header>
	)
}
