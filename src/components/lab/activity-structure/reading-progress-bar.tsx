import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider
} from "@/components/shadcn/ui/tooltip"

export default function ReadingProgressBar({ readingProgressPercentage }: { readingProgressPercentage: number }) {
	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>
					<div className={"w-1/3 h-3 bg-zinc-200 rounded-full dark:bg-zinc-700 overflow-hidden"}>
						<div
							className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full
							transition-all duration-300 ease-out"
							style={{
								width: `${readingProgressPercentage}%`,
								boxShadow: "0 0 10px rgba(34, 197, 94, 0.3)" // subtle glow
							}}
						/>
					</div>
				</TooltipTrigger>
				<TooltipContent side="bottom" className="text-zinc-100 dark:text-zinc-900 mt-2">
					{Math.round(readingProgressPercentage)}% complete
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
