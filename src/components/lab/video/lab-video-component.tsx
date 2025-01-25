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
		<div className="h-screen flex flex-col">
			{/* Header - fixed height */}
			<header className="h-20 flex items-center px-4 border-b border-zinc-300 dark:border-zinc-700">
				<Button
					className="!text-2xl flex items-center duration-100"
					onClick={() => navigate(`/lab/element-${element}`)}
					variant="ghost"
				>
					<ArrowLeft className="!h-6 !w-6" />
					<CustomBeaker className="!h-6 !w-6" />
                    Lab
				</Button>
				<h2 className="text-4xl font-semibold flex-1 text-center">{videoTitle}</h2>
				<div className="w-32" /> {/* Spacer to balance the button */}
			</header>

			{/* Main content - fills remaining space */}
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

			{/* Footer - fixed height */}
			<footer className="h-20 flex items-center justify-between px-4 border-t border-zinc-300 dark:border-zinc-700">
				<Button
					className="!text-2xl rounded-2xl flex items-center bg-pipTheme hover:bg-pipThemeHover dark:text-white transition-none"
					onClick={() => navigate(previousPageLink)}
					variant="tactile"
				>
					<ArrowLeft className="!h-6 !w-6" />
					<GetActivityIconFromActivityName
						activityType={previousPageActivity}
						className="!h-6 !w-6"
					/>
                    Previous Lesson
				</Button>

				<Button
					className="!text-2xl rounded-2xl flex items-center bg-pipTheme hover:bg-pipThemeHover dark:text-white transition-none"
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
			</footer>
		</div>
	)
}

export default observer(LabVideoComponent)
