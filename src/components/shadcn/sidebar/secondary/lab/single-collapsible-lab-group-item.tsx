import { ChevronRight } from "lucide-react"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/shadcn/ui/collapsible"
import {
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubItem,
	SidebarMenuSubButton,
} from "@/components/shadcn/ui/sidebar"
import useTypedNavigate from "../../../../../hooks/navigate/typed-navigate"

interface Props {
	item: LabNavData
	openSections: Record<string, boolean>
	setOpenSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}

export default function SingleCollapsibleLabGroupItem(props: Props) {
	const { item, openSections, setOpenSections } = props
	const navigate = useTypedNavigate()

	return (
		<Collapsible
			key={item.title}
			asChild
			open={openSections[item.title]}
			onOpenChange={(open) => {
				setOpenSections(prev => ({ ...prev, [item.title]: open }))
			}}
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
}
