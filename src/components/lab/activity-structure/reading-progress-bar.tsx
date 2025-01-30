import { cn } from "../../../lib/shadcn/utils"

interface Props {
	currentBlock: number
	totalBlocks: number
	className?: string
}

export default function ReadingProgressBar({ currentBlock, totalBlocks, className }: Props) {
	const progress = (currentBlock / totalBlocks) * 100

	return (
		<div className={cn("w-48 h-3 bg-zinc-200 rounded-full dark:bg-zinc-700 overflow-hidden", className)}>
			<div
				className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-300 ease-out"
				style={{
					width: `${progress}%`,
					boxShadow: "0 0 10px rgba(34, 197, 94, 0.3)" // subtle glow
				}}
			/>
		</div>
	)
}
