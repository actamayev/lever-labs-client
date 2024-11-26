import {
	Sidebar,
	SidebarHeader,
	SidebarInput,
} from "@/components/shadcn/ui/sidebar"

export default function SandboxSidebar() {
	// TODO: Add a map of the user's past projects here. search should filter, there should be an add project button
	return (
		<Sidebar collapsible="none" className="hidden flex-1 md:flex">
			<SidebarHeader className="gap-3.5 border-b p-4">
				<div className="flex w-full items-center justify-between">
					<div className="text-base font-medium text-foreground">
						Sandbox
					</div>
				</div>
				<SidebarInput placeholder="Type to search..." />
			</SidebarHeader>
		</Sidebar>
	)
}
