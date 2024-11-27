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

const navData: SidebarNavData[] = [
	{
		title: "Sandbox",
		url: "/sandbox",
		icon: TbSandbox
	},
	{
		title: "Lab",
		url: "/lab",
		icon: HiBeaker
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
							<SidebarMenuItem key={item.title} className="flex justify-center">
								<SidebarMenuButton
									tooltip={{
										children: item.title,
										hidden: false,
									}}
									onClick={() => navigate(item.url)}
									isActive={location.pathname === item.url}
									className="flex items-center justify-center px-2.5 md:px-2" // Added justify-center
									style={{ height: "60px", width: "60px" }}
								>
									<div className="flex items-center justify-center">
										<item.icon style={{ width: "50px", height: "50px" }}/>
									</div>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
		</SidebarContent>
	)
}
