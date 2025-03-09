import { X } from "lucide-react"
import isUndefined from "lodash-es/isUndefined"
import { Button } from "../../../shadcn/ui/button"
import ReadingProgressBar from "./reading-progress-bar"
import useTypedNavigate from "../../../../hooks/navigate/typed-navigate"
import LessonProgressIconContainer from "./lesson-progress-icon-container"

interface Props {
	lessonTitle?: Element1Lessons
	lessonProgressPercent?: number
	activityType: ActivityType
}

export default function ActivityHeader(props: Props) {
	const {
		lessonTitle,
		lessonProgressPercent,
		activityType,
	} = props
	const typedNavigate = useTypedNavigate()

	return (
		<header
			className="h-20 flex items-center justify-between px-4 shadow-md
			fixed top-0 left-0 right-0 bg-standardBackground z-10"
		>
			<div className="w-1/3">
				<div className="flex items-center">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => typedNavigate("/lab")}
						className="!p-6 hover:bg-sidebarButtonHover"
					>
						<X className="!h-6 !w-6" />
					</Button>
				</div>
			</div>

			<div className="w-1/3 flex justify-center">
				{activityType === "Reading" && <ReadingProgressBar />}
			</div>

			<div className="w-1/3 flex justify-end">
				<div className="flex justify-end mr-4">
					{(!isUndefined(lessonProgressPercent) && !isUndefined(lessonTitle)) && (
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
