"use client"

import { cn } from "../../lib/shadcn/utils"

export default function BlocklyLoadingComponent({ extraClasses = "h-1/2" }: { extraClasses?: string }) {
	return (
		<div className={cn("relative z-0 rounded-b-lg overflow-hidden border-x-2 border-b-2 border-swan animate-pulse", extraClasses)}>
			<div className="w-full h-full bg-standardBackground  flex flex-col">
			</div>
		</div>
	)
}
