"use client"

import { cn } from "../../lib/shadcn/utils"
import Workbench from "../workbench/workbench"

interface WorkbenchLayoutProps {
	children: React.ReactNode
	extraChildrenClasses?: string
	extraParentClasses?: string
	preventElasticScroll?: boolean
}

export default function WorkbenchLayout(props: WorkbenchLayoutProps) {
	const {
		children,
		extraChildrenClasses = "",
		extraParentClasses = "flex flex-row w-full",
		preventElasticScroll = false
	} = props

	return (
		<div className={cn("h-screen relative", extraParentClasses)}>
			{/* Main content area with hidden scrollbar */}
			<div
				className={cn(
					"w-[62.5%] overflow-y-auto scrollbar-hide",
					preventElasticScroll ? "overscroll-none" : "",
					extraChildrenClasses
				)}
				style={{
					/* Firefox */
					scrollbarWidth: "none",
					/* IE and Edge */
					msOverflowStyle: "none",
				}}
			>
				{children}
			</div>

			<Workbench />
		</div>
	)
}
