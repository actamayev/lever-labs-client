import SidebarLogo from "./sidebar-logo"
import MappedNavData from "./mapped-nav-data"
import NavUser from "@/components/shadcn/nav-user"
import { Sidebar, SidebarFooter } from "@/components/shadcn/ui/sidebar"

// TODO: Add an add pip button above nav user
export default function PrimarySidebar() {
	return (
		<Sidebar
			collapsible="none"
			className="!w-[calc(var(--sidebar-width-icon))] border-r transition-all duration-300"
		>
			<SidebarLogo />
			<MappedNavData />
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	)
}
