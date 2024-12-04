import NavTheme from "../../nav-theme"
import SidebarLogo from "./sidebar-logo"
import MappedNavData from "./mapped-nav-data"
import NavUser from "@/components/shadcn/nav-user"
import { Sidebar, SidebarFooter } from "@/components/shadcn/ui/sidebar"

export default function PrimarySidebar() {
	return (
		<Sidebar
			collapsible="none"
			className="!w-[calc(var(--sidebar-width-icon))] border-r transition-all duration-300"
		>
			<SidebarLogo />
			<MappedNavData />
			<SidebarFooter>
				<NavTheme />
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	)
}
