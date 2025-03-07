import { useCallback } from "react"
import toUpper from "lodash-es/toUpper"
import { ArrowRight } from "lucide-react"
import { BlueTactileButton } from "../../buttons/tactile-buttons"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider
} from "@/components/shadcn/ui/tooltip"
import { usePageTransitionContext } from "../../../contexts/page-transition-context"

interface Props {
	nextPageLink?: LabPages
	nextPageActivity?: ActivityType
	nextPageTooltip?: string
}

export default function ActivityFooter(props: Props) {
	const {
		nextPageLink,
		nextPageActivity,
		nextPageTooltip
	} = props
	const navigate = useTypedNavigate()
	const pageTransitionClass = usePageTransitionContext()

	const goToNextPage = useCallback(() => {
		if (!nextPageLink) return
		pageTransitionClass.setDirection("left")
		navigate(nextPageLink)
	}, [navigate, nextPageLink, pageTransitionClass])

	return (
		<footer
			className="h-20 flex items-center justify-between px-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-1px_rgba(0,0,0,0.06)]
      fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 z-10"
		>
			<div className="flex-1"></div>

			{!nextPageTooltip ? (
				<BlueTactileButton
					onClick={goToNextPage}
					className="!text-xl h-12"
				>
					UP NEXT: {toUpper(nextPageActivity)}
					<ArrowRight className="!h-6 !w-6" />
				</BlueTactileButton>
			) : (
				<TooltipProvider delayDuration={0}>
					<Tooltip>
						<TooltipTrigger asChild>
							<BlueTactileButton
								onClick={goToNextPage}
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
			)}
		</footer>
	)
}
