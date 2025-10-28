"use client"
import React from "react"
import Link from "next/link"
import isUndefined from "lodash-es/isUndefined"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { cn } from "../../lib/utils"

interface CustomSidebarButtonProps {
	icon: React.ReactNode
	text: string
	isActive?: boolean
	goTo: PageNames
	customStyles?: string
}

export default function CustomSidebarButton({
	icon,
	text,
	isActive,
	goTo,
	customStyles,
}: CustomSidebarButtonProps): React.ReactNode {
	const pathname = usePathname()
	if (isUndefined(isActive)) {
		isActive = goTo === pathname
	}
	return (
		<Link
			href={goTo}
			className="block w-full"
		>
			<SidebarMenuButton
				isActive={isActive}
				className={cn(
					// Base styles - ensure consistent sizing
					"transition-none flex! items-center justify-start p-0! h-[50px]! w-full", // Added w-full
					"border-2 border-transparent rounded-xl",
					// Active/hover states
					isActive
						? "bg-selected-sidebar-button-background!"
						: "hover:bg-polar!",
					// Size and dimensions - apply consistent sizing regardless of collapsible state
					"group-data-[collapsible=icon]:h-[50px]! group-data-[collapsible=icon]:w-[170px]!",
					// Custom styles passed from parent
					isActive && "border-selected-sidebar-button-border!",
					customStyles
				)}
			>
				<div className="flex items-center justify-start space-x-4 w-full pl-2.5"> {/* Added w-full */}
					<div className="w-[35px] h-[35px] text-beetle">
						{icon}
					</div>
					<div className={cn(
						"text-base font-medium",
						isActive ? "text-macaw" : "text-wolf"
					)}>
						{text}
					</div>
				</div>
			</SidebarMenuButton>
		</Link>
	)
}
