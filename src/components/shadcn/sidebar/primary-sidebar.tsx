"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/shadcn/ui/sidebar"
import SidebarLogo from "./sidebar-logo"
import NavUser from "./nav-user/nav-user"
import MappedNavData from "./mapped-nav-data"
import AddPipSidebarButton from "./add-pip/add-pip-sidebar-button"
import { usePathname } from "next/navigation"
import { showPrimarySidebarPages } from "../../../utils/constants"

export default function PrimarySidebar() {
	const pathname = usePathname()
	const shouldShowSidebar = showPrimarySidebarPages.includes(pathname as PageNames)

	if (!shouldShowSidebar) return null

	return (
		<Sidebar
			collapsible="icon"
			className="hidden md:flex !border-r-2 border-disabledLilypadBackground"
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
