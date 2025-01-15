import { BookOpen, Play, Code } from "lucide-react"
import {
	SidebarMenuSubItem,
	SidebarMenuSubButton,
} from "@/components/shadcn/ui/sidebar"
import useTypedNavigate from "../../../../../hooks/navigate/typed-navigate"
import { cn } from "../../../../../lib/shadcn/utils"

interface Props {
	subItem: {
		title: ActivityTitles
		url: LabPages
	}
}

const activityIcons = {
	Reading: BookOpen,
	Video: Play,
	Code: Code
} as const

export default function SingleActivityTitle(props: Props) {
	const { subItem } = props
	const navigate = useTypedNavigate()
	const Icon = activityIcons[subItem.title]

	return (
		<SidebarMenuSubItem key={subItem.title}>
			<SidebarMenuSubButton
				asChild
				onClick={() => navigate(subItem.url)}
				className={cn(
					"text-sm transition-all duration-100",
					"hover:bg-zinc-100 dark:hover:bg-zinc-800",
					location.pathname !== subItem.url ? "" : "bg-zinc-100 dark:bg-zinc-800"
				)}
				style={{ marginLeft: "3px" }}
			>
				<span className="cursor-pointer flex items-center gap-2">
					<Icon className="h-4 w-4" />
					{subItem.title}
				</span>
			</SidebarMenuSubButton>
		</SidebarMenuSubItem>
	)
}
