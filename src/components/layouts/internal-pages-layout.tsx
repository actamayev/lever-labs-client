import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/shadcn/ui/sidebar"
import PipUuids from "../pip-uuids/pip-uuids"
import { Separator } from "@/components/shadcn/ui/separator"
import { AppSidebar } from "@/components/shadcn/sidebar/app-sidebar"

export default function InternalPagesLayout({ children } : { children: React.ReactNode }) {
	return (
		<SidebarProvider style={{ "--sidebar-width": "400px" } as React.CSSProperties}>
			<AppSidebar />
			<SidebarInset>
				<header className="fixed w-full top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 z-40">
					<SidebarTrigger className="-ml-1 size-10"/>
					<Separator orientation="vertical" className="mr-2 h-4" />
					<PipUuids />
				</header>
				<div className="pt-16">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
