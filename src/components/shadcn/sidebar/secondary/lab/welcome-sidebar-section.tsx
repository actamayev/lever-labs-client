import { House } from "lucide-react"
import { SidebarGroup, SidebarGroupLabel } from "@/components/shadcn/ui/sidebar"
import useTypedNavigate from "../../../../../hooks/navigate/typed-navigate"

export default function WelcomeSidebarSection() {
	const navigate = useTypedNavigate()

	return (
		<SidebarGroup>
			<SidebarGroupLabel
				className="text-xl dark:text-white text-black cursor-pointer
				dark:hover:bg-zinc-800 transition-all"
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
