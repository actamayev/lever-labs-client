import {
	Sidebar,
	SidebarHeader,
	SidebarContent,
} from "@/components/shadcn/ui/sidebar"
import LabGroupMap from "./lab-group-map"
import WelcomeSidebarSection from "./welcome-sidebar-section"
import element1NavData from "../../../../../utils/lab/element-one-nav-data"
import element2NavData from "../../../../../utils/lab/element-two-nav-data"
import element3NavData from "../../../../../utils/lab/element-three-nav-data"

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
			<SidebarContent>
				<WelcomeSidebarSection />
				<LabGroupMap
					elementName="Element 1: Sensor Basics"
					navData={element1NavData}
					elementRoute="/lab/element-1"
				/>
				<LabGroupMap
					elementName="Element 2: Combine & Create"
					navData={element2NavData}
					elementRoute="/lab/element-2"
				/>
				<LabGroupMap
					elementName="Element 3: Missions"
					navData={element3NavData}
					elementRoute="/lab/element-3"
				/>
			</SidebarContent>
		</Sidebar>
	)
}
