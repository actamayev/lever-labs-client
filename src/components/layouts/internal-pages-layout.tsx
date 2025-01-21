import { useMemo } from "react"
import { useLocation } from "react-router"
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/shadcn/ui/sidebar"
import { AppSidebar } from "@/components/shadcn/sidebar/app-sidebar"

export default function InternalPagesLayout({ children } : { children: React.ReactNode }) {
	const location = useLocation()

	const shouldShowSidebarTrigger = useMemo(() => {
		if (
			location.pathname === "/add-pip" ||
			location.pathname === "/settings" ||
			location.pathname.startsWith("/lab")
		) return false
		return true
	}, [location.pathname])

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				{shouldShowSidebarTrigger && (
					<header
						className="fixed w-full top-0 flex shrink-0 items-center gap-2 border-b bg-background px-4 py-3 z-40 \
						transition-all duration-300"
					>
						<SidebarTrigger className="-ml-1 w-12 h-12 transition-all duration-300"/>
					</header>
				)}
				<div className="pt-16 transition-all duration-300">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
