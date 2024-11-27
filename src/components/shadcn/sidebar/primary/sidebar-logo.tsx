import { Link } from "react-router-dom"
import {
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
} from "@/components/shadcn/ui/sidebar"

export default function SidebarLogo() {
	return (
		<SidebarHeader>
			<SidebarMenu>
				<SidebarMenuItem className="flex justify-center">
					<Link
						to="/"
						className="flex items-center flex-shrink-0 dark:text-white"
					>
						<div className="flex aspect-square size-16 items-center justify-center rounded-lg">
							<img
								src="/favicon.svg"
								alt="Logo"
							/>
						</div>
					</Link>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>
	)
}
