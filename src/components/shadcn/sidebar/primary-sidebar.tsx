"use client"

import { usePathname } from "next/navigation"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/shadcn/ui/sidebar"
import SidebarLogo from "./sidebar-logo"
import MappedNavData from "./mapped-nav-data"
import ProfileSidebarButton from "./profile-sidebar-button"
import ConnectDisconnectSerial from "./connect-serial-button"
import { PrivatePageNames, OpenPages } from "../../../utils/constants/page-constants"

export default function PrimarySidebar(): React.ReactNode {
	const pathname = usePathname()

	const isPrivatePage = PrivatePageNames.some((privatePage): boolean => {
		// Exact match for most pages
		if (pathname === privatePage) return true

		// Prefix match for class-manager and whiteboard
		if (
			(privatePage === "/class-manager" || privatePage === "/whiteboard") &&
			pathname.startsWith(privatePage + "/")
		) {
			return true
		}

		return false
	})

	const isOpenPage = OpenPages.some((openPath): boolean =>
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
				<ConnectDisconnectSerial />
				<ProfileSidebarButton />
			</SidebarFooter>
		</Sidebar>
	)
}
