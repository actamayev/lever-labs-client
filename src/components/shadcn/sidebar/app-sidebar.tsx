import { useLocation } from "react-router"
import { Sidebar } from "@/components/shadcn/ui/sidebar"
import SecondarySidebar from "./secondary/secondary-sidebar"
import PrimarySidebar from "./primary/primary-sidebar"
import { showPrimarySidebarPages } from "../../../utils/constants"

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const location = useLocation()
	const shouldShowSidebar = showPrimarySidebarPages.includes(location.pathname as PageNames)
	if (!shouldShowSidebar) return null

	return (
		<Sidebar
			collapsible="icon"
			className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
			{...props}
		>
			<PrimarySidebar />
			<SecondarySidebar />
		</Sidebar>
	)
}
