import { Bot, PlusCircle } from "lucide-react"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/shadcn/ui/sidebar"
import useTypedNavigate from "../../../../hooks/navigate/typed-navigate"

//TODO: Change this from cricle plus to circle plus and a robot (show that you're adding a bot)
export default function AddPipSidebarButton() {
	const navigate = useTypedNavigate()

	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex justify-center">
				<SidebarMenuButton
					tooltip={{
						children: "Add Pip",
						hidden: false,
					}}
					onClick={() => navigate("/add-pip")}
					className="!flex !h-[54px] !w-[54px] !min-w-[54px] relative items-center justify-center
					group-data-[collapsible=icon]:!h-[54px] group-data-[collapsible=icon]:!w-[54px]
					data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground !p-0"
					isActive={location.pathname === "/add-pip"}
				>
					<Bot className="!h-[35px] !w-[35px] !min-w-[35px]" />
					<PlusCircle
						className="absolute !h-[20px] !w-[20px] bg-background rounded-full"
						style={{ right: "1px", top: "1px" }}
					/>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
