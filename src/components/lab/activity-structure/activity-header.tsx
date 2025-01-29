import { X } from "lucide-react"
import isNull from "lodash-es/isNull"
import { ReactElement } from "react"
import { Button } from "../../shadcn/ui/button"
import LabCodePipStatus from "./lab-code-pip-status"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"
import LessonProgressIconContainer from "../lab-structure/lesson-progress-icon-container"

interface Props {
	element: ElementNumbers
	lessonTitle: string
	lessonIcon: ReactElement | null
	progressPercent: number | null
	isCode?: boolean
}

export default function ActivityHeader(props: Props) {
	const { element, lessonTitle, lessonIcon, progressPercent, isCode = false } = props
	const navigate = useTypedNavigate()

	return (
		<header className="h-20 flex items-center justify-between px-4 border-b-2
		border-zinc-300 dark:border-zinc-700 fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 z-10">
			<div className="flex w-32">
				<div className="flex items-center justify-start duration-100 rounded-2xl cursor-pointer w-full">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => navigate(`/lab/element-${element}`)}
						className="!p-6"
					>
						<X className="!h-6 !w-6" />
					</Button>
				</div>
			</div>
			<h2 className="text-4xl font-semibold flex-1 text-center">{lessonTitle}</h2>
			<div className="flex items-center w-32">
				{isCode && <div className="mr-4"><LabCodePipStatus /></div>}
				<div className="flex justify-end ml-auto mr-4">
					{lessonIcon && !isNull(progressPercent) && (
						<LessonProgressIconContainer
							icon={lessonIcon}
							progressPercent={progressPercent}
						/>
					)}
				</div>
			</div>
		</header>
	)
}
