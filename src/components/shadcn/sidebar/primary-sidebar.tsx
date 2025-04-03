"use client"

import { usePathname } from "next/navigation"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/shadcn/ui/sidebar"
import SidebarLogo from "./sidebar-logo"
import NavUser from "./nav-user/nav-user"
import MappedNavData from "./mapped-nav-data"
import { PrivatePageNames } from "../../../utils/constants"
import AddPipSidebarButton from "./add-pip/add-pip-sidebar-button"

export default function PrimarySidebar() {
	const pathname = usePathname()
	const shouldShowSidebar =
		PrivatePageNames.includes(pathname as PageNames) ||
		pathname.startsWith("/sandbox/") // This will match all /sandbox/uuid paths

	if (!shouldShowSidebar) return null

	return (
		<Sidebar
			collapsible="icon"
			className="hidden md:flex !border-r-2 border-swan"
		>
			<SidebarHeader>
				<SidebarLogo />
			</SidebarHeader>

			<SidebarContent>
				<MappedNavData />
			</SidebarContent>

			<SidebarFooter>
				<AddPipSidebarButton />
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	)
}
