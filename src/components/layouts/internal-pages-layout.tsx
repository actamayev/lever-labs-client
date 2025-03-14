import { useLocation } from "react-router"
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/shadcn/ui/sidebar"
import AppSidebar from "@/components/shadcn/sidebar/app-sidebar"
import { cn } from "../../lib/shadcn/utils"

export default function InternalPagesLayout({ children } : { children: React.ReactNode }) {
	const location = useLocation()

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				{location.pathname.startsWith("/sandbox") && (
					<header
						className={cn(
							"fixed w-full top-0 flex shrink-0 items-center bg-inherit",
							"gap-2 border-b-2 px-4 py-3 z-40 transition-all duration-300"
						)}
					>
						<SidebarTrigger className="-ml-1 w-12 h-12 transition-none rounded-xl
						hover:!bg-sidebarButtonHover text-questionText" />
					</header>
				)}
				<div className="transition-all duration-300 bg-standardBackground">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
