import { AppSidebar } from "@/components/shadcn/app-sidebar"
import { Separator } from "@/components/shadcn/ui/separator"
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/shadcn/ui/sidebar"
import PipUuids from "../site-header/pip-uuids/pip-uuids"
import BlocklyComponent from "../blockly-component"

export default function MySidebar() {
	return (
		<SidebarProvider
			style={ { "--sidebar-width": "350px" } as React.CSSProperties }
		>
			<AppSidebar />
			<SidebarInset>
				<header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<PipUuids />
				</header>
				<BlocklyComponent />
				{/* <div className="flex flex-1 flex-col gap-4 p-4">
					{Array.from({ length: 24 }).map((_, index) => (
						<div
							key={index}
							className="aspect-video h-12 w-full rounded-lg bg-muted/50"
						/>
					))}
				</div> */}
			</SidebarInset>
		</SidebarProvider>
	)
}
