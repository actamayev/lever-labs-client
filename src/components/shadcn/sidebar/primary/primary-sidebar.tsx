import { Link } from "react-router-dom"
import {
	Sidebar,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
} from "@/components/shadcn/ui/sidebar"
import NavUser from "@/components/shadcn/nav-user"
import NavTheme from "../../nav-theme"
import MappedNavData from "./mapped-nav-data"

export default function PrimarySidebar() {
	return (
		<Sidebar
			collapsible="none"
			className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
		>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<Link
							to="/"
							className="flex items-center flex-shrink-0 dark:text-white"
						>
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg">
								<img
									src="/favicon.svg"
									alt="Logo"
									className="h-8 w-8" // This will make the logo fill the container
								/>
							</div>
						</Link>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<MappedNavData />
			<SidebarFooter>
				<NavTheme />
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	)
}
