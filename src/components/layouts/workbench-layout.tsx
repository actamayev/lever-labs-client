"use client"

import { cn } from "../../lib/shadcn/utils"
import Workbench from "../workbench/workbench"

interface WorkbenchLayoutProps {
  children: React.ReactNode
  extraChildrenClasses?: string
  extraParentClasses?: string
  preventElasticScroll?: boolean // Add this new prop
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
			{/* Main content area with optional elastic scroll prevention */}
			<div className={cn(
				"w-[62.5%] overflow-y-auto",
				preventElasticScroll ? "overscroll-none" : "",
				extraChildrenClasses
			)}>
				{children}
			</div>

			<Workbench />
		</div>
	)
}
