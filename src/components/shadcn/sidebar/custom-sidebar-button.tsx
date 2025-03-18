"use client"
import React from "react"
import { SidebarMenuButton } from "@/components/shadcn/ui/sidebar"
import { cn } from "../../../lib/shadcn/utils"

interface CustomSidebarButtonProps {
	icon: React.ReactNode;
	text: string;
	isActive: boolean;
	onClick: () => void;
	iconClassName?: string;
	customStyles?: string;
}

export default function CustomSidebarButton({
	icon,
	text,
	isActive,
	onClick,
	iconClassName,
	customStyles,
}: CustomSidebarButtonProps) {
	return (
		<SidebarMenuButton
			onClick={onClick}
			isActive={isActive}
			className={cn(
				// Base styles - ensure consistent sizing
				"transition-none !flex items-center justify-start !p-0 !h-[50px]",
				"border-2 border-transparent rounded-xl",
				// Active/hover states
				isActive
					? "!bg-selectedSidebarButtonBackground"
					: "hover:!bg-sidebarButtonHover",
				// Size and dimensions - apply consistent sizing regardless of collapsible state
				"group-data-[collapsible=icon]:!h-[50px] group-data-[collapsible=icon]:!w-[170px]",
				// Custom styles passed from parent
				customStyles
			)}
		>
			<div className="flex items-center justify-center space-x-4">
				<div className={cn("ml-2.5 flex-shrink-0 w-[35px] h-[35px]", iconClassName)}>
					{icon}
				</div>
				<div className={cn(
					"text-base font-medium",
					isActive ? "text-macaw" : "text-lightLandingPageText"
				)}>
					{text}
				</div>
			</div>
		</SidebarMenuButton>
	)
}
