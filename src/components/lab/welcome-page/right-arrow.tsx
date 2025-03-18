"use client"

import { ChevronRight } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"

export default function RightArrow({ iconSize } : { iconSize?: string }) {
	return (
		<div className="flex items-center h-12 md:h-20">
			<ChevronRight className={cn("size-6 text-beetle dark:text-purple-600", iconSize)} />
		</div>
	)
}
