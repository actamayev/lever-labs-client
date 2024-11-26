import { useMemo } from "react"
import { IconType } from "react-icons"
import { HiBeaker } from "react-icons/hi"
import { TbSandbox } from "react-icons/tb"
import { useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarHeader,
  SidebarInput,
} from "@/components/shadcn/ui/sidebar"

interface NavData {
	title: string
	url: StaticPageNames
	icon: IconType
	isActive: boolean
}

// This is sample navData
const navData: NavData[] = [
	{
		title: "Sandbox",
		url: "/sandbox",
		icon: TbSandbox,
		isActive: true,
	},
	{
		title: "Lab",
		url: "/lab",
		icon: HiBeaker,
		isActive: false,
	}
]

export default function SecondarySidebar() {
	const location = useLocation()
  
	const getTitle = useMemo(() => {
		if (location.pathname === "/sandbox") return "Sandbox"
		else if (location.pathname === "/lab") return "Lab"
		else return ""
	}, [location.pathname])

	return (
	<Sidebar collapsible="none" className="hidden flex-1 md:flex">
			<SidebarHeader className="gap-3.5 border-b p-4">
			<div className="flex w-full items-center justify-between">
				<div className="text-base font-medium text-foreground">
				{getTitle}
				</div>
			</div>
			<SidebarInput placeholder="Type to search..." />
			</SidebarHeader>
		</Sidebar>
	)
}
