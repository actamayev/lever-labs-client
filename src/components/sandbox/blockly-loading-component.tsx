"use client"

import { cn } from "../../lib/shadcn/utils"

export default function BlocklyLoadingComponent({ extraClasses = "h-1/2" }: { extraClasses?: string }) {
	return (
		<div className={cn("relative z-0 rounded-lg overflow-hidden border-2 border-swan animate-pulse", extraClasses)}>
			<div className="w-full h-full bg-standardBackground  flex flex-col">
			</div>
		</div>
	)
}
