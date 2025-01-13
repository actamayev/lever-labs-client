import { useLocation } from "react-router"
import { ChevronRight } from "lucide-react"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/shadcn/ui/collapsible"
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubItem,
	SidebarMenuSubButton,
} from "@/components/shadcn/ui/sidebar"
import useTypedNavigate from "../../../../../hooks/navigate/typed-navigate"

interface Props {
	groupName: string
	navData: LabNavData[]
	elementName: ElementLabPages
}

export default function LabGroupMap(props: Props) {
	const { groupName, navData, elementName } = props
	const navigate = useTypedNavigate()
	const location = useLocation()

	return (
		<SidebarGroup>
			<SidebarGroupLabel
				className="text-lg dark:text-white text-black hover:bg-zinc-100 dark:hover:bg-zinc-800
				transition-colors duration-100 rounded-lg px-2 py-1 cursor-pointer mb-2"
				onClick={() => navigate(elementName)}
			>
				{groupName}
			</SidebarGroupLabel>
			<SidebarMenu>
				{navData.map((item) => {
					const basePath = item.items[0]?.url.split("/").slice(0, -1).join("/") || ""
					const isCurrentSection = location.pathname.startsWith(basePath)
					return (
						<Collapsible
							key={item.title}
							asChild
							defaultOpen={isCurrentSection}
							className="group/collapsible"
						>
							<SidebarMenuItem>
								<CollapsibleTrigger asChild>
									<SidebarMenuButton
										tooltip={item.title}
										className="py-4 px-2 my-1"
									>
										<item.icon style={{ width: "25px", height: "25px" }} />
										<span className="text-base">
											{item.title}
										</span>
										<ChevronRight
											className="ml-auto transition-transform duration-100
											group-data-[state=open]/collapsible:rotate-90"
										/>
									</SidebarMenuButton>
								</CollapsibleTrigger>
								<CollapsibleContent>
									<SidebarMenuSub>
										{item.items.map((subItem) => (
											<SidebarMenuSubItem key={subItem.title}>
												<SidebarMenuSubButton
													asChild
													onClick={() => navigate(subItem.url)}
													className={`ml-2 text-sm transition-all duration-100
														hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
											location.pathname === subItem.url
												? "bg-zinc-100 dark:bg-zinc-800"
												: ""
											}`}
												>
													<span className="cursor-pointer">
														{subItem.title}
													</span>
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										))}
									</SidebarMenuSub>
								</CollapsibleContent>
							</SidebarMenuItem>
						</Collapsible>
					)
				})}
			</SidebarMenu>
		</SidebarGroup>
	)
}
