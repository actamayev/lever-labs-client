import { useCallback } from "react"
import toUpper from "lodash-es/toUpper"
import { useLocation } from "react-router"
import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
} from "@/components/shadcn/ui/sidebar"
import { CustomBeaker } from "../../../icons/custom-beaker"
import { CustomSandbox } from "../../../icons/custom-sandbox"
import useTypedNavigate from "../../../../hooks/navigate/typed-navigate"
import CustomSidebarButton from "./custom-sidebar-button"

const navData: SidebarNavData[] = [
	{
		title: "Lab",
		url: "/lab",
		icon: CustomBeaker,
		iconColorClass: "text-labIconColor"
	},
	{
		title: "Sandbox",
		url: "/sandbox",
		icon: CustomSandbox,
		iconColorClass: "text-sandboxIconColor"
	}
]

export default function MappedNavData() {
	const navigate = useTypedNavigate()
	const location = useLocation()

	const isActive = useCallback((itemUrl: PageNames) => {
		return location.pathname.startsWith(itemUrl)
	}, [location.pathname])

	return (
		<SidebarContent>
			<SidebarGroup className="pt-2">
				<SidebarGroupContent className="px-1.5 md:px-0">
					<SidebarMenu>
						{navData.map((item) => (
							<SidebarMenuItem key={item.title} className="flex justify-start mb-1.5">
								<CustomSidebarButton
									icon={<item.icon />}
									text={toUpper(item.title)}
									isActive={isActive(item.url)}
									onClick={() => navigate(item.url)}
									iconClassName={item.iconColorClass}
								/>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
		</SidebarContent>
	)
}
