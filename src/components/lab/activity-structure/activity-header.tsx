import { ReactElement } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "../../shadcn/ui/button"
import { CustomBeaker } from "../../icons/custom-beaker"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"
import LessonProgressIconContainer from "../lab-structure/lesson-progress-icon-container"

interface Props {
	element: 1 | 2 | 3
	lessonTitle: string
	lessonIcon: ReactElement | null
	progressPercent: number | null
}

export default function ActivityHeader(props: Props) {
	const { element, lessonTitle, lessonIcon, progressPercent } = props
	const navigate = useTypedNavigate()

	return (
		<header className="h-20 flex items-center px-16 border-b-2 border-zinc-300 dark:border-zinc-700">
			<div className="flex w-32">
				<Button
					className="!text-2xl flex items-center duration-100"
					onClick={() => navigate(`/lab/element-${element}`)}
					variant="ghost"
				>
					<ArrowLeft className="!h-6 !w-6" />
					<CustomBeaker className="!h-6 !w-6" />
					Lab
				</Button>
			</div>
			<h2 className="text-4xl font-semibold flex-1 text-center">{lessonTitle}</h2>
			<div className="w-32 flex justify-end">
				{lessonIcon && progressPercent && (
					<LessonProgressIconContainer
						icon={lessonIcon}
						progressPercent={progressPercent}
					/>
				)}
			</div>
		</header>
	)
}
