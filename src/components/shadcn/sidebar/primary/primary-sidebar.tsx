import { Sidebar, SidebarFooter } from "@/components/shadcn/ui/sidebar"
import SidebarLogo from "./sidebar-logo"
import NavUser from "./nav-user/nav-user"
import MappedNavData from "./mapped-nav-data"
import AddPipSidebarButton from "./add-pip/add-pip-sidebar-button"

export default function PrimarySidebar() {
	return (
		<Sidebar
			collapsible="none"
			className="!w-[calc(var(--sidebar-width-icon))] border-r
			bg-standardBackground border-disabledLilypadBackground"
		>
			<SidebarLogo />
			<MappedNavData />
			<SidebarFooter>
				<AddPipSidebarButton />
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	)
}
