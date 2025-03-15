"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/shadcn/ui/sidebar"
import SandboxSidebar from "./sandbox-sidebar"
import PrimarySidebar from "./primary/primary-sidebar"
import { showPrimarySidebarPages } from "../../../utils/constants"

export default function AppSidebar() {
	const pathName = usePathname()
	const shouldShowSidebar = showPrimarySidebarPages.includes(pathName as PageNames)

	if (!shouldShowSidebar) return null

	return (
		<Sidebar
			collapsible="icon"
			className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row border-disabledLilypadBackground"
		>
			<PrimarySidebar />
			{pathName?.startsWith("/sandbox") && <SandboxSidebar />}
		</Sidebar>
	)
}
