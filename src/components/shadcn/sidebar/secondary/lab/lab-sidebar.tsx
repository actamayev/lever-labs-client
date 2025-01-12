import {
	Sidebar,
	SidebarHeader,
} from "@/components/shadcn/ui/sidebar"
import LabGroupMap from "./lab-group-map"
import WelcomeSidebarSection from "./welcome-sidebar-section"
import { platformNavData } from "../../../../../utils/lab/nav-data"

export default function LabSidebar() {
	return (
		<Sidebar collapsible="none" className="hidden flex-1 md:flex transition-all duration-300">
			<SidebarHeader className="gap-3.5 border-b p-4">
				<div className="flex w-full items-center justify-between">
					<div className="text-4xl font-medium text-foreground">
						Lab
					</div>
				</div>
				{/* <SidebarInput placeholder="Search lessons..." /> */}
			</SidebarHeader>
			<WelcomeSidebarSection />
			<LabGroupMap
				groupName="Element 1: Sensor Basics"
				navData={platformNavData}
				elementName="/lab/element-1"
			/>
			{/* <LabGroupMap
				groupName="Sensors"
				navData={sensorsNavData}
			/> */}
		</Sidebar>
	)
}
