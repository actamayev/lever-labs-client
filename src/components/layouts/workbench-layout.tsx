"use client"

import { cn } from "../../lib/shadcn/utils"
import Workbench from "../workbench/workbench"

interface WorkbenchLayoutProps {
	children: React.ReactNode
	extraChildrenClasses?: string
	extraParentClasses?: string
}

export default function WorkbenchLayout(props: WorkbenchLayoutProps) {
	const {
		children,
		extraChildrenClasses = "",
		extraParentClasses = "flex flex-row overflow-y-auto w-full"
	} = props
	return (
		<div className={cn("h-screen relative", extraParentClasses)}>
			{/* Left sidebar */}
			{/* Main content area */}
			<div className={cn("w-[62.5%]", extraChildrenClasses)}>
				{children}
			</div>

			<Workbench />
		</div>
	)
}
