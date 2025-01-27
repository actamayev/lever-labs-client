import { toLower } from "lodash-es"
import { observer } from "mobx-react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/shadcn/ui/button"
import { usePipContext } from "../../../contexts/pip-context"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"
import GetActivityIconFromActivityName from "../lab-structure/get-activity-icon-from-name"

interface Props {
    previousPageLink: LabPages | null
    previousPageActivity: ActivityType | null
    nextPageLink: LabPages
    nextPageActivity: ActivityType
    isNextPageDemo?: boolean
}

function ActivityFooter(props: Props) {
	const {
		previousPageLink,
		previousPageActivity,
		nextPageLink,
		nextPageActivity,
		isNextPageDemo = false
	} = props
	const pipClass = usePipContext()
	const navigate = useTypedNavigate()

	// 1/26/25 TODO: Test this (there should be two buttons if the user doesn't have a pip. demo disabled, and the other option)
	const isNextButtonDisabled = isNextPageDemo && !pipClass.doesUserHaveAPip
	// 1/26/25 TODO: If user has no pip, make two back buttons also.

	return (
		<footer className="h-20 flex items-center justify-between px-4 border-t-2 border-zinc-300 dark:border-zinc-700">
			{previousPageLink && previousPageActivity && (
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
					Back to {toLower(previousPageActivity)}
				</Button>
			)}

			<Button
				className="!text-2xl rounded-2xl flex items-center bg-pipTheme hover:bg-pipThemeHover
				dark:text-white transition-none ml-auto"
				onClick={() => navigate(nextPageLink)}
				disabled={isNextButtonDisabled}
				variant="tactile"
			>
				Up next: {toLower(nextPageActivity)}
				<GetActivityIconFromActivityName
					activityType={nextPageActivity}
					className="!h-6 !w-6"
				/>
				<ArrowRight className="!h-6 !w-6" />
			</Button>
		</footer>
	)
}

export default observer(ActivityFooter)
