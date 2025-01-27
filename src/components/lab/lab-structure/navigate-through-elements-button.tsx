import { ChevronDown, CircuitBoard, Cpu, Flag } from "lucide-react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu"
import { Button } from "@/components/shadcn/ui/button"
import GetCurrentElement from "./get-current-element"
import { CustomHouse } from "../../icons/custom-house"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"

interface Props {
	navigateToPage: LabPages
	item: React.ReactNode
}

function ElementDropdownMenuItem(props: Props) {
	const { navigateToPage, item } = props
	const navigate = useTypedNavigate()

	return (
		<DropdownMenuItem
			className="cursor-pointer text-2xl"
			onClick={() => navigate(navigateToPage)}
		>
			{item}
		</DropdownMenuItem>
	)
}

export default function NavigateThroughElementsButton () {
	return (
		<div className="">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="flex items-center gap-2 text-3xl h-12
						hover:bg-zinc-100 dark:hover:bg-zinc-800 duration-100"
					>
						<GetCurrentElement />
						<ChevronDown className="h-6 w-6" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="text-lg">
					<ElementDropdownMenuItem
						navigateToPage="/lab/welcome"
						item={<><CustomHouse className="!size-6"/>Welcome</>}
					/>
					<ElementDropdownMenuItem
						navigateToPage="/lab/element-1"
						item={<><CircuitBoard className="!size-6"/>Element 1: Sensor Basics</>}
					/>
					<ElementDropdownMenuItem
						navigateToPage="/lab/element-2"
						item={<><Cpu className="!size-6"/>Element 2: Combine & Create</>}
					/>
					<ElementDropdownMenuItem
						navigateToPage="/lab/element-3"
						item={<><Flag className="!size-6"/>Element 3: Missions</>}
					/>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
