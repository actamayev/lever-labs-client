"use client"

import { cn } from "../../lib/shadcn/utils"
import Workbench from "../workbench/workbench"
import WorkbenchSeparator from "../workbench/workbench-separator"

interface WorkbenchLayoutProps {
	children: React.ReactNode
	needsSeparator?: boolean
	extraChildrenClasses?: string
	extraParentClasses?: string
}

export default function WorkbenchLayout(props: WorkbenchLayoutProps) {
	const {
		children,
		needsSeparator = false,
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

			{needsSeparator && (
				<WorkbenchSeparator />
			)}

			<Workbench />
		</div>
	)
}
