import { useLocation } from "react-router"
import { ChevronRight } from "lucide-react"
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
} from "@/components/shadcn/ui/sidebar"
import { Button } from "../../../ui/button"
import { cn } from "../../../../../lib/shadcn/utils"
import useTypedNavigate from "../../../../../hooks/navigate/typed-navigate"
import SingleCollapsibleLabGroupItem from "./single-collapsible-lab-group-item"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../ui/collapsible"

interface Props {
	elementName: string
	navData: LabNavData[]
	elementRoute: ElementLabPages
}

export default function LabGroupMap(props: Props) {
	const { elementName, navData, elementRoute } = props
	const navigate = useTypedNavigate()
	const location = useLocation()

	return (
		<SidebarGroup>
			<Collapsible
				asChild
				className="group/collapsible"
				defaultOpen
			>
				<div>
					<div className="flex items-center justify-between mb-2">
						<SidebarGroupLabel
							className={cn(
								"text-lg dark:text-white text-black hover:bg-zinc-100 dark:hover:bg-zinc-800",
								"transition-colors duration-75 rounded-lg px-1 mx-1 py-1 cursor-pointer flex-grow",
								location.pathname !== elementRoute ? "" : "bg-zinc-100 dark:bg-zinc-800"
							)}
							onClick={() => navigate(elementRoute)}
						>
							{elementName}
						</SidebarGroupLabel>
						<CollapsibleTrigger asChild>
							<Button
								variant="ghost"
								className="mr-0.5 py-1 px-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800
								rounded-lg transition-colors duration-75"
							>
								<ChevronRight
									className="transition-transform duration-100
									group-data-[state=open]/collapsible:rotate-90"
								/>
							</Button>
						</CollapsibleTrigger>
					</div>
					<CollapsibleContent>
						<SidebarMenu>
							{navData.map((item) => (
								<SingleCollapsibleLabGroupItem
									key={item.title}
									item={item}
								/>
							))}
						</SidebarMenu>
					</CollapsibleContent>
				</div>
			</Collapsible>
		</SidebarGroup>
	)
}
