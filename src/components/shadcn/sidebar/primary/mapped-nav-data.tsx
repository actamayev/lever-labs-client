import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/shadcn/ui/sidebar"
import useTypedNavigate from "../../../../hooks/navigate/typed-navigate"
import { Sandbox } from "../../../icons/all-icons"
import { CustomBeaker } from "../../../icons/custom-beaker"

const navData: SidebarNavData[] = [
	{
		title: "Lab",
		url: "/lab",
		icon: CustomBeaker
	},
	{
		title: "Sandbox",
		url: "/sandbox",
		icon: Sandbox
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
									className="!flex !h-[60px] !w-[60px] !min-w-[60px] items-center
									justify-center !p-0 group-data-[collapsible=icon]:!h-[60px] group-data-[collapsible=icon]:!w-[60px]
									transition-all duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
								>
									<div className="flex h-[50px] w-[50px] !min-w-[50px] items-center justify-center">
										<item.icon
											className="!h-[50px] !w-[50px] transition-all duration-300 ease-in-out text-sidebar-foreground
											data-[active=true]:text-sidebar-accent-foreground"
											data-active={location.pathname === item.url}
										/>
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
