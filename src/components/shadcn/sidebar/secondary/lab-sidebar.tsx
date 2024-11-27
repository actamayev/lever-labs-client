import {
	Sidebar,
	SidebarHeader,
	SidebarInput,
} from "@/components/shadcn/ui/sidebar"
import LabGroupMap from "./lab-group-map"
import { platformNavData, sensorsNavData } from "../../../../utils/lab/nav-data"

export default function LabSidebar() {
	return (
		<Sidebar collapsible="none" className="hidden flex-1 md:flex">
			<SidebarHeader className="gap-3.5 border-b p-4">
				<div className="flex w-full items-center justify-between">
					<div className="text-4xl font-medium text-foreground">
						Lab
					</div>
				</div>
				{/* <SidebarInput placeholder="Search lessons..." /> */}
			</SidebarHeader>
			<LabGroupMap
				groupName="Platform"
				navData={platformNavData}
			/>
			<LabGroupMap
				groupName="Sensors"
				navData={sensorsNavData}
			/>
		</Sidebar>
	)
}
