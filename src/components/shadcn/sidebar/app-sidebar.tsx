import { useLocation } from "react-router"
import { Sidebar } from "@/components/shadcn/ui/sidebar"
import { cn } from "../../../lib/shadcn/utils"
import SandboxSidebar from "./sandbox-sidebar"
import PrimarySidebar from "./primary/primary-sidebar"
import { showPrimarySidebarPages } from "../../../utils/constants"

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const location = useLocation()
	const shouldShowSidebar = showPrimarySidebarPages.includes(location.pathname as PageNames)
	const isInSandbox = location.pathname.startsWith("/sandbox")

	if (!shouldShowSidebar) return null

	return (
		<Sidebar
			collapsible="icon"
			className={cn(
				"overflow-hidden [&>[data-sidebar=sidebar]]:flex-row border-disabledLilypadBackground",
				// Add class to help maintain button styles when sandbox is open
				isInSandbox && "has-sandbox-sidebar"
			)}
			{...props}
		>
			<PrimarySidebar />
			{isInSandbox && <SandboxSidebar />}
		</Sidebar>
	)
}
