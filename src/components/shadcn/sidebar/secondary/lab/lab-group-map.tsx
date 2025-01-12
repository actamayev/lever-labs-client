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
	SidebarMenuSubButton,
	SidebarMenuSubItem,
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
				className="text-xl dark:text-white text-black"
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
										className="py-6 px-2"
									>
										<item.icon style={{ width: "25px", height: "25px" }}/>
										<span className="text-lg">
											{item.title}
										</span>
										<ChevronRight
											className="ml-auto transition-transform
                                            duration-200 group-data-[state=open]/collapsible:rotate-90"
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
													className={`ml-2 text-sm transition-all ${
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
