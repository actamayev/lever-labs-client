import { ChevronRight } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"

export default function RightArrow({ iconSize } : { iconSize?: string }) {
	return (
		<div className="hidden md:flex items-center h-20">
			<ChevronRight className={cn("size-6 text-purple-400 dark:text-purple-600", iconSize)} />
		</div>
	)
}
