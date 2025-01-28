import isNull from "lodash-es/isNull"
import { ReactElement } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "../../shadcn/ui/button"
import LabCodePipStatus from "./lab-code-pip-status"
import { CustomBeaker } from "../../icons/custom-beaker"
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
		<header className="h-20 flex items-center justify-between px-4 border-b-2 border-zinc-300 dark:border-zinc-700">
			<div className="flex w-32">
				<Button
					className="!text-2xl flex items-center duration-100 rounded-2xl cursor-pointer w-full"
					onClick={() => navigate(`/lab/element-${element}`)}
				>
					<div className="flex items-center">
						<ArrowLeft className="!h-6 !w-6" />
						<CustomBeaker className="!h-6 !w-6" />
						<span>Lab</span>
					</div>
				</Button>
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
