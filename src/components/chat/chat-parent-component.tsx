"use client"

import { cn } from "../../lib/shadcn/utils"

interface ChatParentComponentProps {
	children: React.ReactNode
	extraClasses?: string
}

export default function ChatParentComponent({ children, extraClasses }: ChatParentComponentProps): React.ReactNode {
	return (
		<div
			className={cn(
				// eslint-disable-next-line max-len
				"flex flex-col h-full max-h-full bg-standard-background rounded-3xl border-2 border-swan overflow-hidden chat-parent-component",
				extraClasses
			)}
			data-chat-component="true"
		>
			{children}
		</div>
	)
}
