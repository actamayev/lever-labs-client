import { ChevronRight } from "lucide-react"
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from "@/components/shadcn/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/shadcn/ui/collapsible"
import SingleActivityTitle from "./single-activity-title"

interface Props {
	item: LabNavData
	openSections: Record<string, boolean>
	setOpenSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}

export default function SingleCollapsibleLabGroupItem(props: Props) {
	const { item, openSections, setOpenSections } = props

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
					<SidebarMenuButton className="py-5 px-2 my-1 duration-75">
						<item.icon
							style={{ width: "25px", height: "25px" }}
							className="ml-2"
						/>
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
							<SingleActivityTitle
								key={subItem.title}
								subItem={subItem}
							/>
						))}
					</SidebarMenuSub>
				</CollapsibleContent>
			</SidebarMenuItem>
		</Collapsible>
	)
}
