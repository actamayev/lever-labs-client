import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/shadcn/ui/sidebar"
import { HiBeaker } from "react-icons/hi"
import { TbSandbox } from "react-icons/tb"
import useTypedNavigate from "../../../../hooks/navigate/typed-navigate"

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

export default function MappedNavData() {
	const navigate = useTypedNavigate()

	return (
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
	)
}
