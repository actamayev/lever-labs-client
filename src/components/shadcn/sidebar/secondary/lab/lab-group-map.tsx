import { useState } from "react"
import { useLocation } from "react-router"
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
} from "@/components/shadcn/ui/sidebar"
import ToggleAllLessons from "./toggle-all-lessons"
import { cn } from "../../../../../lib/shadcn/utils"
import useTypedNavigate from "../../../../../hooks/navigate/typed-navigate"
import SingleCollapsibleLabGroupItem from "./single-collapsible-lab-group-item"

interface Props {
	groupName: string
	navData: LabNavData[]
	elementName: ElementLabPages
}

export default function LabGroupMap(props: Props) {
	const { groupName, navData, elementName } = props
	const navigate = useTypedNavigate()
	const location = useLocation()
	const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
		// Initialize with current section open
		const initialState: Record<string, boolean> = {}
		navData.forEach((item) => {
			const basePath = item.items[0]?.url.split("/").slice(0, -1).join("/") || ""
			initialState[item.title] = location.pathname.startsWith(basePath)
		})
		return initialState
	})

	return (
		<SidebarGroup>
			<div className="flex items-center justify-between mb-2">
				<SidebarGroupLabel
					className={cn(
						"text-lg dark:text-white text-black hover:bg-zinc-100 dark:hover:bg-zinc-800",
						"transition-colors duration-75 rounded-lg px-1 mx-1 py-1 cursor-pointer flex-grow",
						location.pathname !== elementName ? "" : "bg-zinc-100 dark:bg-zinc-800"
					)}
					onClick={() => navigate(elementName)}
				>
					{groupName}
				</SidebarGroupLabel>
				<ToggleAllLessons
					navData={navData}
					openSections={openSections}
					setOpenSections={setOpenSections}
				/>
			</div>
			<SidebarMenu>
				{navData.map((item) => (
					<SingleCollapsibleLabGroupItem
						key={item.title}
						item={item}
						openSections={openSections}
						setOpenSections={setOpenSections}
					/>
				))}
			</SidebarMenu>
		</SidebarGroup>
	)
}
