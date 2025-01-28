import toLower from "lodash-es/toLower"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/shadcn/ui/button"
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
		border-zinc-300 dark:border-zinc-700 fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 z-10">
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
