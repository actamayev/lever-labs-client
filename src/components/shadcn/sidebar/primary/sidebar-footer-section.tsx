import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarFooter
} from "@/components/shadcn/ui/sidebar"
import NavUser from "./nav-user/nav-user"
import AddPipSidebarButton from "./add-pip/add-pip-sidebar-button"

export default function SidebarFooterSection() {
	return (
		<SidebarFooter>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent className="px-1.5 md:px-0 space-y-1.5">
						<AddPipSidebarButton />
						<NavUser />
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</SidebarFooter>
	)
}
