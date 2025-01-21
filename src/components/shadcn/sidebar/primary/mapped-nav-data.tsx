import { useCallback } from "react"
import { useLocation } from "react-router"
import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/shadcn/ui/sidebar"
import { CustomBeaker } from "../../../icons/custom-beaker"
import { CustomSandbox } from "../../../icons/custom-sandbox"
import useTypedNavigate from "../../../../hooks/navigate/typed-navigate"

const navData: SidebarNavData[] = [
	{
		title: "Lab",
		url: "/lab",
		icon: CustomBeaker
	},
	{
		title: "Sandbox",
		url: "/sandbox",
		icon: CustomSandbox
	}
]

export default function MappedNavData() {
	const navigate = useTypedNavigate()
	const location = useLocation()

	const isActive = useCallback((itemUrl: string) => {
		return location.pathname.startsWith(itemUrl)
	}, [location.pathname])

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
									isActive={isActive(item.url)}
									className="!flex !h-[60px] !w-[60px] !min-w-[60px] items-center
									justify-center !p-0 group-data-[collapsible=icon]:!h-[60px] group-data-[collapsible=icon]:!w-[60px]
									transition-all duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-800
									active:bg-zinc-200 dark:active:bg-zinc-800"
								>
									<div className="flex h-[50px] w-[50px] !min-w-[50px] items-center justify-center">
										<item.icon
											className="!h-[50px] !w-[50px] transition-all duration-300 ease-in-out text-sidebar-foreground
											data-[active=true]:text-sidebar-accent-foreground"
											data-active={isActive(item.url)}
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
