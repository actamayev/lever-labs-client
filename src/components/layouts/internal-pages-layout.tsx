import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/shadcn/ui/sidebar"
import PipUuids from "../pip-uuids/pip-uuids"
import { Separator } from "@/components/shadcn/ui/separator"
import { AppSidebar } from "@/components/shadcn/sidebar/app-sidebar"

export default function InternalPagesLayout({ children } : {children: React.ReactNode}) {
	return (
		<SidebarProvider style={ { "--sidebar-width": "350px" } as React.CSSProperties }>
			<AppSidebar />
			<SidebarInset>
				<header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<PipUuids />
				</header>
				{ children }
			</SidebarInset>
		</SidebarProvider>
	)
}
