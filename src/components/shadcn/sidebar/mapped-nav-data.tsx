"use client"

import { useCallback } from "react"
import toUpper from "lodash-es/toUpper"
import { usePathname } from "next/navigation"
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
} from "@/components/shadcn/ui/sidebar"
import { cn } from "../../../lib/shadcn/utils"
import { CustomBeaker } from "../../icons/custom-beaker"
import { CustomGarage } from "../../icons/custom-garage"
import CustomSidebarButton from "./custom-sidebar-button"
import { CustomSandbox } from "../../icons/custom-sandbox"
import { CustomBriefcase } from "../../icons/custom-briefcase"

const navData: SidebarNavData[] = [
	{
		title: "Career Quest",
		url: "/career-quest",
		icon: CustomBriefcase,
		textColor: "text-bee"
	},
	{
		title: "Lab",
		url: "/lab",
		icon: CustomBeaker,
		textColor: "text-labIconColor"
	},
	{
		title: "Sandbox",
		url: "/sandbox",
		icon: CustomSandbox,
		textColor: "text-sandboxIconColor"
	},
	{
		title: "Garage",
		url: "/garage",
		icon: CustomGarage,
		textColor: "text-humpback"
	},
]

export default function MappedNavData() {
	const pathname = usePathname()

	const isActive = useCallback((itemUrl: PageNames) => {
		return pathname.startsWith(itemUrl)
	}, [pathname])

	return (
		<SidebarGroup>
			<SidebarGroupContent className="px-1.5">
				<SidebarMenu>
					{navData.map((item) => {
						const active = isActive(item.url)
						// Create styled icon elements
						const iconElement = (
							<div className={cn(
								"w-full h-full flex items-center justify-center",
								item.textColor
							)}>
								<item.icon className="h-[35px] w-[35px]" />
							</div>
						)

						return (
							<SidebarMenuItem key={item.title} className="flex justify-center mb-1">
								<CustomSidebarButton
									icon={iconElement}
									text={toUpper(item.title)}
									isActive={active}
									goTo={item.url}
									customStyles={cn(
										active && "!border-selectedSidebarButtonBorder"
									)}
								/>
							</SidebarMenuItem>
						)
					})}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}
