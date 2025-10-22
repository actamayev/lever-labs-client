"use client"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import PrimarySidebar from "../sidebar/primary-sidebar"

export default function InternalPagesLayout({ children } : { children: React.ReactNode }): React.ReactNode {
	return (
		<SidebarProvider>
			<PrimarySidebar />
			<SidebarInset>
				<div className="duration-0 bg-standard-background">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
