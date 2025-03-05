import { observer } from "mobx-react"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider
} from "@/components/shadcn/ui/tooltip"
import { useLabReadingContext } from "../../../../contexts/lab-reading-context"

function ReadingProgressBar() {
	const labReadingClass = useLabReadingContext()

	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>
					<div className="w-full h-4 bg-zinc-200 rounded-full dark:bg-zinc-700 overflow-hidden">
						<div
							className="relative h-full rounded-full transition-all duration-300 ease-out bg-green-500"
							style={{
								width: `${labReadingClass.readingProgressPercentage}%`,
							}}
						>
							<div
								className="absolute top-1 left-2 right-2 rounded-full"
								style={{
									background: "rgb(45, 205, 94)",
									height: "3px"
								}}
							/>
						</div>
					</div>
				</TooltipTrigger>
				<TooltipContent side="bottom" className="text-zinc-100 dark:text-zinc-900 mt-2">
					{Math.round(labReadingClass.readingProgressPercentage)}% complete
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default observer(ReadingProgressBar)
