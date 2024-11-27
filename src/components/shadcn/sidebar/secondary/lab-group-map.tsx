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
import useTypedNavigate from "../../../../hooks/navigate/typed-navigate"

interface Props {
	groupName: string
	navData: SidebarNavData[]
}

export default function LabGroupMap(props: Props) {
	const { groupName, navData } = props
	const navigate = useTypedNavigate()

	return (
		<SidebarGroup>
			<SidebarGroupLabel className="text-xl dark:text-white text-black">
				{groupName}
			</SidebarGroupLabel>
			<SidebarMenu>
				{navData.map((item) => (
					<Collapsible
						key={item.title}
						asChild
						className="group/collapsible"
					>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton
									tooltip={item.title}
									className="py-6 px-2" // Increased padding and added gap between items
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
									{item.items?.map((subItem) => (
										<SidebarMenuSubItem key={subItem.title}>
											<SidebarMenuSubButton
												asChild
												onClick={() => navigate(item.url)}
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
				))}
			</SidebarMenu>
		</SidebarGroup>
	)
}
