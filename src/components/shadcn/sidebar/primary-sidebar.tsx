import NavUser from "@/components/shadcn/nav-user"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/shadcn/ui/sidebar"
import { Link } from "react-router-dom"
import { HiBeaker } from "react-icons/hi"
import { TbSandbox } from "react-icons/tb"
import NavTheme from "../nav-theme"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"

// This is sample navData
const navData: SidebarNavData[] = [
	{
		title: "Sandbox",
		url: "/sandbox",
		icon: TbSandbox,
	},
	{
		title: "Lab",
		url: "/lab",
		icon: HiBeaker,
	}
]

export default function PrimarySidebar() {
	const navigate = useTypedNavigate()

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
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent className="px-1.5 md:px-0">
						<SidebarMenu>
							{navData.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										tooltip={{
											children: item.title,
											hidden: false,
										}}
										onClick={() => navigate(item.url)}
										isActive={location.pathname === item.url}
										className="px-2.5 md:px-2"
									>
										<item.icon />
										<span>{item.title}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<NavTheme />
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	)
}
