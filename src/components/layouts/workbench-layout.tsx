"use client"

import Workbench from "../workbench/workbench"
import WorkbenchSeparator from "../workbench/workbench-separator"

interface WorkbenchLayoutProps {
	children: React.ReactNode
	needsSeparator?: boolean
}

export default function WorkbenchLayout({ children, needsSeparator = false }: WorkbenchLayoutProps) {
	return (
		<div className="flex flex-row h-screen overflow-y-auto relative w-full">
			{/* Main content area */}
			<div className="w-[62.5%]">
				{children}
			</div>

			{needsSeparator && (
				<WorkbenchSeparator />
			)}

			<Workbench />
		</div>
	)
}
