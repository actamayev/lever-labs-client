import { House } from "lucide-react"
import { useLocation } from "react-router"
import { SidebarGroup, SidebarGroupLabel } from "@/components/shadcn/ui/sidebar"
import useTypedNavigate from "../../../../../hooks/navigate/typed-navigate"

export default function WelcomeSidebarSection() {
	const navigate = useTypedNavigate()
	const location = useLocation()

	const isActive = location.pathname === "/lab/welcome"

	return (
		<SidebarGroup>
			<SidebarGroupLabel
				className={`
					text-xl dark:text-white text-black cursor-pointer
					transition-all duration-100
					${isActive ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}
					`}
				onClick={() => navigate("/lab/welcome")}
			>
				<div className="space-x-2 flex flex-row">
					<House style={{ width: "25px", height: "25px" }} />
					<span className="text-lg">
						Welcome
					</span>
				</div>
			</SidebarGroupLabel>
		</SidebarGroup>
	)
}
