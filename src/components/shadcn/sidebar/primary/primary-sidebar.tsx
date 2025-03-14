import { Sidebar } from "@/components/shadcn/ui/sidebar"
import SidebarLogo from "./sidebar-logo"
import MappedNavData from "./mapped-nav-data"
import SidebarFooterSection from "./sidebar-footer-section"

export default function PrimarySidebar() {
	return (
		<Sidebar
			collapsible="none"
			className="!w-[calc(var(--sidebar-width-icon))] border-r
			bg-standardBackground border-disabledLilypadBackground"
		>
			<SidebarLogo />
			<MappedNavData />
			<SidebarFooterSection />
		</Sidebar>
	)
}
