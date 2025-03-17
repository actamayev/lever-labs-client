"use client"

import { SidebarInset, SidebarProvider } from "@/components/shadcn/ui/sidebar"
import PrimarySidebar from "../shadcn/sidebar/primary-sidebar"

export default function InternalPagesLayout({ children } : { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<PrimarySidebar />
			<SidebarInset>
				<div className="transition-all duration-300 bg-standardBackground">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
