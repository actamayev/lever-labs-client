import SidebarLogo from "./sidebar-logo"
import MappedNavData from "./mapped-nav-data"
import { Sidebar, SidebarFooter } from "@/components/shadcn/ui/sidebar"
import NavUser from "./nav-user/nav-user"

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
