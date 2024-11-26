import { GiCarWheel } from "react-icons/gi"
import { FaLightbulb } from "react-icons/fa"

import { ChevronRight } from "lucide-react"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/shadcn/ui/collapsible"
import {
	Sidebar,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInput,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/shadcn/ui/sidebar"
import useTypedNavigate from "../../../../hooks/navigate/typed-navigate"

const navData: SidebarNavData[] = [
	{
		title: "LED",
		url: "/lab",
		icon: FaLightbulb,
		items: [
			{
				title: "Turn LED On",
				url: "/lab",
			},
			{
				title: "Flash LED",
				url: "/lab",
			},
			{
				title: "Choose LED color by hex",
				url: "/lab",
			},
		],
	},
	{
		title: "Motors",
		url: "/lab",
		icon: GiCarWheel,
		items: [
			{
				title: "Spin motors forward",
				url: "/lab",
			},
			{
				title: "Spin motors backward",
				url: "/lab",
			},
			{
				title: "Spin motors in different directions",
				url: "/lab",
			},
		],
	}
]

export default function LabSidebar() {
	const navigate = useTypedNavigate()

	return (
		<Sidebar collapsible="none" className="hidden flex-1 md:flex">
			<SidebarHeader className="gap-3.5 border-b p-4">
				<div className="flex w-full items-center justify-between">
					<div className="text-base font-medium text-foreground">
						Lab
					</div>
				</div>
				<SidebarInput placeholder="Type to search..." />
			</SidebarHeader>
			<SidebarGroup>
				<SidebarGroupLabel>Platform</SidebarGroupLabel>
				<SidebarMenu>
					{navData.map((item) => (
						<Collapsible
							key={item.title}
							asChild
							// defaultOpen={item.isActive}
							className="group/collapsible"
						>
							<SidebarMenuItem>
								<CollapsibleTrigger asChild>
									<SidebarMenuButton tooltip={item.title}>
										<item.icon />
										<span>{item.title}</span>
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
													<span className="cursor-pointer">{subItem.title}</span>
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
		</Sidebar>
	)
}
