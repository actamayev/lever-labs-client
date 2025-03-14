import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	// SidebarInput,
} from "@/components/shadcn/ui/sidebar"

export default function SandboxSidebar() {
	return (
		<Sidebar collapsible="none" className="hidden flex-1 md:flex transition-all duration-300 border-r">
			<SidebarHeader className="gap-3.5 border-b-2 p-4">
				<div className="flex w-full items-center justify-between">
					<div className="text-4xl font-medium text-questionText">
						Sandbox
					</div>
				</div>
				{/* <SidebarInput placeholder="Search projects..." /> */}
			</SidebarHeader>
			<SidebarContent>
				{/* // 12/1/25 TODO: Add a map of the user's past projects here.
				// search should filter, there should be an add project button */}
			</SidebarContent>
		</Sidebar>
	)
}
