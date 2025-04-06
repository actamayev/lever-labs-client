"use client"

import { usePathname } from "next/navigation"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/shadcn/ui/sidebar"
import SidebarLogo from "./sidebar-logo"
import ProfileSidebarButton from "./profile-sidebar-button"
import MappedNavData from "./mapped-nav-data"
import { PrivatePageNames, OpenPages } from "../../../utils/constants"
import AddPipSidebarButton from "./add-pip/add-pip-sidebar-button"

export default function PrimarySidebar() {
	const pathname = usePathname()

	const isPrivatePage = PrivatePageNames.includes(pathname as PageNames)

	const isOpenPage = OpenPages.some(openPath =>
		pathname.startsWith(openPath)
	)

	// Show sidebar if:
	// 1. It's a private page (always show regardless of login status)
	// 2. It's an open page AND the user is logged in
	const shouldShowSidebar = isPrivatePage || isOpenPage

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
				<ProfileSidebarButton />
			</SidebarFooter>
		</Sidebar>
	)
}
