import PrimarySidebar from "./primary/primary-sidebar"
import { Sidebar } from "@/components/shadcn/ui/sidebar"
import SecondarySidebar from "./secondary/secondary-sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
