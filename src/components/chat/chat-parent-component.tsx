"use client"

import { cn } from "../../lib/shadcn/utils"

interface ChatParentComponentProps {
	children: React.ReactNode
	extraClasses?: string
}

export default function ChatParentComponent({ children, extraClasses }: ChatParentComponentProps) {
	return (
		<div
			className={cn(
				"flex flex-col h-full max-h-full bg-standardBackground rounded-3xl border-2 border-swan overflow-hidden",
				extraClasses
			)}
		>
			{children}
		</div>
	)
}
