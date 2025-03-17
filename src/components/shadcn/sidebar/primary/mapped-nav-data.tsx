"use client"

import { useCallback } from "react"
import { usePathname } from "next/navigation"
import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/shadcn/ui/sidebar"
import { cn } from "../../../../lib/shadcn/utils"
import { CustomBeaker } from "../../../icons/custom-beaker"
import { CustomSandbox } from "../../../icons/custom-sandbox"
import useTypedNavigate from "../../../../hooks/navigate/typed-navigate"

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
		<SidebarContent>
			<SidebarGroup>
				<SidebarGroupContent className="px-1.5 md:px-0">
					<SidebarMenu>
						{navData.map((item) => (
							<SidebarMenuItem key={item.title} className="flex justify-center mb-1">
								<SidebarMenuButton
									tooltip={{ children: item.title, hidden: false }}
									onClick={() => navigate(item.url)}
									isActive={isActive(item.url)}
									className={cn(
										"transition-none !flex !h-[55px] !w-[55px] !min-w-[55px] items-center justify-center !p-0",
										isActive(item.url)
											? "!bg-selectedSidebarButtonBackground"
											: "hover:!bg-sidebarButtonHover",
										"group-data-[collapsible=icon]:!h-[55px] group-data-[collapsible=icon]:!w-[55px]"
									)}
								>
									<div className="flex items-center justify-center">
										<item.icon
											className={cn(
												"!h-[45px] !w-[45px] transition-none",
												item.title === "Lab"
													? "text-labIconColor"
													: "text-sandboxIconColor"
											)}
											data-active={isActive(item.url)}
										/>
									</div>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
		</SidebarContent>
	)
}
