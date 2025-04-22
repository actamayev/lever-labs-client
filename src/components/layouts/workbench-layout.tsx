"use client"

import { cn } from "../../lib/shadcn/utils"
import Workbench from "../workbench/workbench"
import WorkbenchSeparator from "../workbench/workbench-separator"

interface WorkbenchLayoutProps {
	children: React.ReactNode
	needsSeparator?: boolean
	extraClasses?: string
}

export default function WorkbenchLayout(props: WorkbenchLayoutProps) {
	const { children, needsSeparator = false, extraClasses = ""} = props
	return (
		<div className="flex flex-row h-screen overflow-y-auto relative w-full">
			{/* Main content area */}
			<div className={cn("w-[62.5%]", extraClasses)}>
				{children}
			</div>

			{needsSeparator && (
				<WorkbenchSeparator />
			)}

			<Workbench />
		</div>
	)
}
