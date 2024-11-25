import { AppSidebar } from "../shadcn/app-sidebar"
import { SidebarTrigger, SidebarProvider } from "../shadcn/ui/sidebar"

export default function MySidebar({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main>
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	)
}
