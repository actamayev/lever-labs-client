import toUpper from "lodash-es/toUpper"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { BlueTactileButton } from "../../tactile-buttons"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"
import GetActivityIconFromActivityName from "../lab-structure/get-activity-icon-from-name"

interface Props {
    previousPageLink: LabPages | null
    previousPageActivity: ActivityType | null
    nextPageLink: LabPages
    nextPageActivity: ActivityType
}

export default function ActivityFooter(props: Props) {
	const {
		previousPageLink,
		previousPageActivity,
		nextPageLink,
		nextPageActivity,
	} = props
	const navigate = useTypedNavigate()

	return (
		<footer className="h-20 flex items-center justify-between px-4 border-t-2
		border-zinc-300 dark:border-zinc-700 fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 z-10">
			{previousPageLink && previousPageActivity && (
				<BlueTactileButton
					onClick={() => navigate(previousPageLink)}
					className="!text-xl h-12"
				>
					<ArrowLeft className="!h-6 !w-6" />
					<GetActivityIconFromActivityName
						activityType={previousPageActivity}
						className="!h-6 !w-6"
					/>
					BACK TO {toUpper(previousPageActivity)}
				</BlueTactileButton>
			)}

			<BlueTactileButton
				onClick={() => navigate(nextPageLink)}
				className="!text-xl h-12"
			>
				UP NEXT: {toUpper(nextPageActivity)}
				<GetActivityIconFromActivityName
					activityType={nextPageActivity}
					className="!h-6 !w-6"
				/>
				<ArrowRight className="!h-6 !w-6" />
			</BlueTactileButton>
		</footer>
	)
}
