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
import { cn } from "../../../../lib/shadcn/utils"

const navData: SidebarNavData[] = [
	{
		title: "Lab",
		url: "/lab/element-1",
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
		if (itemUrl === "/lab/element-1") return location.pathname.startsWith("/lab")
		return location.pathname.startsWith(itemUrl)
	}, [location.pathname])

	return (
		<SidebarContent>
			<SidebarGroup>
				<SidebarGroupContent className="px-1.5 md:px-0">
					<SidebarMenu>
						{navData.map((item) => (
							<SidebarMenuItem key={item.title} className="flex justify-center mb-1">
								<SidebarMenuButton
									tooltip={{
										children: item.title,
										hidden: false,
									}}
									onClick={() => navigate(item.url)}
									isActive={isActive(item.url)}
									className={cn("!flex !h-[55px] !w-[55px] !min-w-[55px] items-center justify-center !p-0 duration-none",
										isActive(item.url)
											? "bg-lightBackgroundHover dark:bg-darkBackgroundHover"
											: "hover:bg-sidebarButtonHoverLight dark:hover:bg-sidebarButtonHoverDark",
										"group-data-[collapsible=icon]:!h-[55px] group-data-[collapsible=icon]:!w-[55px]")}
								>
									<div className="flex h-[45px] w-[45px] !min-w-[45px] items-center justify-center">
										<item.icon
											className={`!h-[45px] !w-[45px] duration-none
                                                ${item.title === "Lab" ?
								"text-green-500 dark:text-green-600" :
								"text-orange-500 dark:text-orange-600"}`}
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
