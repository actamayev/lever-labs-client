import toUpper from "lodash-es/toUpper"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { BlueTactileButton } from "../../buttons/tactile-buttons"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider
} from "@/components/shadcn/ui/tooltip"

interface Props {
	previousPageLink: LabPages | null
	previousPageActivity: ActivityType | null
	previousPageTooltip: string | null
	nextPageLink: LabPages
	nextPageActivity: ActivityType
	nextPageTooltip: string | null
}

export default function ActivityFooter(props: Props) {
	const {
		previousPageLink,
		previousPageActivity,
		previousPageTooltip,
		nextPageLink,
		nextPageActivity,
		nextPageTooltip
	} = props
	const navigate = useTypedNavigate()

	return (
		<footer
			className="h-20 flex items-center justify-between px-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-1px_rgba(0,0,0,0.06)]
      fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 z-10"
		>
			<div className="flex-1 flex">
				{previousPageLink && previousPageActivity && (
					previousPageTooltip ? (
						<TooltipProvider delayDuration={0}>
							<Tooltip>
								<TooltipTrigger asChild>
									<BlueTactileButton
										onClick={() => navigate(previousPageLink)}
										className="!text-xl h-12"
									>
										<ArrowLeft className="!h-6 !w-6" />
										BACK TO {toUpper(previousPageActivity)}
									</BlueTactileButton>
								</TooltipTrigger>
								<TooltipContent side="top" className="text-zinc-100 dark:text-zinc-900">
									{previousPageTooltip}
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					) : (
						<BlueTactileButton
							onClick={() => navigate(previousPageLink)}
							className="!text-xl h-12"
						>
							<ArrowLeft className="!h-6 !w-6" />
							BACK TO {toUpper(previousPageActivity)}
						</BlueTactileButton>
					)
				)}
			</div>

			{nextPageTooltip ? (
				<TooltipProvider delayDuration={0}>
					<Tooltip>
						<TooltipTrigger asChild>
							<BlueTactileButton
								onClick={() => navigate(nextPageLink)}
								className="!text-xl h-12"
							>
								UP NEXT: {toUpper(nextPageActivity)}
								<ArrowRight className="!h-6 !w-6" />
							</BlueTactileButton>
						</TooltipTrigger>
						<TooltipContent side="top" className="text-zinc-100 dark:text-zinc-900">
							{nextPageTooltip}
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			) : (
				<BlueTactileButton
					onClick={() => navigate(nextPageLink)}
					className="!text-xl h-12"
				>
					UP NEXT: {toUpper(nextPageActivity)}
					<ArrowRight className="!h-6 !w-6" />
				</BlueTactileButton>
			)}
		</footer>
	)
}
