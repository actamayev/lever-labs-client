import { Link } from "react-router"
import {
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
} from "@/components/shadcn/ui/sidebar"

export default function SidebarLogo() {
	return (
		<SidebarHeader>
			<SidebarMenu>
				<SidebarMenuItem className="flex justify-start">
					<Link
						to="/lab"
						className="flex !h-14 !w-14 items-center
						justify-center rounded-lg group-data-[collapsible=icon]:!h-16 group-data-[collapsible=icon]:!w-16"
					>
						<div className="flex aspect-square !h-14 !w-14 items-center justify-center">
							<img
								src="/favicon.svg"
								alt="Logo"
								className="!h-14 !w-14"
								loading="lazy"
							/>
						</div>
					</Link>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>
	)
}
