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
import CustomSidebarButton from "./custom-sidebar-button"
import { CustomBeaker } from "../../icons/custom-beaker"
import { CustomSandbox } from "../../icons/custom-sandbox"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"
import { cn } from "../../../lib/shadcn/utils"

const navData: SidebarNavData[] = [
	{
		title: "Lab",
		url: "/lab",
		icon: CustomBeaker
	},
	{
		title: "Sandbox",
		url: "/sandbox",
		icon: CustomSandbox
	}
]

export default function MappedNavData() {
	const navigate = useTypedNavigate()
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
								item.title === "Lab"
									? "text-labIconColor"
									: "text-sandboxIconColor"
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
									onClick={() => navigate(item.url)}
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
