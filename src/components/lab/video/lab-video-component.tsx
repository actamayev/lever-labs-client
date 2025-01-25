import { observer } from "mobx-react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/shadcn/ui/button"
import { CustomBeaker } from "../../icons/custom-beaker"
import { usePipContext } from "../../../contexts/pip-context"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"
import GetActivityIconFromActivityName from "../lab-structure/get-activity-icon-from-name"

interface Props {
    videoTitle: string
    ytVideoId: string
	ytVideoTitle: string
	previousPageLink: LabPages
	previousPageActivity: ActivityType
    nextPageLink: LabPages
	nextPageActivity: ActivityType
    element: 1 | 2 | 3
    isNextPageDemo?: boolean
}

function LabVideoComponent(props: Props) {
	const {
		videoTitle,
		ytVideoId,
		ytVideoTitle,
		previousPageLink,
		previousPageActivity,
		nextPageLink,
		nextPageActivity,
		element,
		isNextPageDemo = false
	} = props
	const pipClass = usePipContext()
	const navigate = useTypedNavigate()

	const isNextButtonDisabled = isNextPageDemo && !pipClass.doesUserHaveAPip

	return (
		<div className="h-screen relative">
			<div className="h-full flex flex-col items-center">
				{/* Header area with back button and title */}
				<div className="w-full max-w-7xl relative mt-12">
					<Button
						className="absolute left-0 !text-2xl flex items-center gap-2"
						onClick={() => navigate(`/lab/element-${element}`)}
						variant="ghost"
					>
						<ArrowLeft className="!h-6 !w-6" />
						<CustomBeaker className="!h-6 !w-6" />
						Lab
					</Button>
					<h2 className="text-4xl font-semibold text-center">{videoTitle}</h2>
				</div>

				{/* Video container with separator */}
				<div className="w-full flex-1 flex flex-col items-center justify-center">
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
					<div className="w-full h-0.5 dark:bg-zinc-700 bg-zinc-300 mt-8" />
				</div>

				<div className="w-full max-w-7xl relative">
					<Button
						className="absolute bottom-4 left-4 !text-2xl transition-none rounded-2xl flex items-center gap-2"
						onClick={() => navigate(previousPageLink)}
						disabled={isNextButtonDisabled}
						variant="tactile"
					>
						<ArrowLeft className="!h-6 !w-6" />
						<GetActivityIconFromActivityName
							activityType={previousPageActivity}
							className="!h-6 !w-6"
						/>
						Previous Lesson
					</Button>
				</div>

				<div className="w-full max-w-7xl relative">
					<Button
						className="absolute bottom-4 right-4 !text-2xl transition-none rounded-2xl flex items-center gap-2"
						onClick={() => navigate(nextPageLink)}
						disabled={isNextButtonDisabled}
						variant="tactile"
					>
						Next Lesson
						<GetActivityIconFromActivityName
							activityType={nextPageActivity}
							className="!h-6 !w-6"
						/>
						<ArrowRight className="!h-6 !w-6" />
					</Button>
				</div>
			</div>
		</div>
	)
}

export default observer(LabVideoComponent)
