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
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="fixed w-full top-0 flex shrink-0 items-center gap-2 border-b bg-background px-4 py-3 z-40">
					<SidebarTrigger className="-ml-1 w-12 h-12"/>
					<Separator orientation="vertical" className="mr-2 h-10" />
					<PipUuids />
				</header>
				<div className="pt-16">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
