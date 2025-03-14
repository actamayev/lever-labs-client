import { useLocation } from "react-router"
import { Sidebar } from "@/components/shadcn/ui/sidebar"
import SandboxSidebar from "./sandbox-sidebar"
import PrimarySidebar from "./primary/primary-sidebar"
import { showPrimarySidebarPages } from "../../../utils/constants"

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const location = useLocation()
	const shouldShowSidebar = showPrimarySidebarPages.includes(location.pathname as PageNames)

	if (!shouldShowSidebar) return null

	return (
		<Sidebar
			collapsible="icon"
			className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row border-disabledLilypadBackground"
			{...props}
		>
			<PrimarySidebar />
			{location.pathname.startsWith("/sandbox") && <SandboxSidebar />}
		</Sidebar>
	)
}
