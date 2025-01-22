import { useLocation } from "react-router"
import { ChevronDown, CircuitBoard, Cpu, Flag } from "lucide-react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu"
import { Button } from "@/components/shadcn/ui/button"
import { CustomHouse } from "../../icons/custom-house"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"

export default function NavigateThroughElementsButton () {
	const navigate = useTypedNavigate()
	const location = useLocation()

	function GetCurrentElement () {
		const path = location.pathname
		if (path.startsWith("/lab/element-1")) {
			return (
				<><CircuitBoard className="!size-7"/>Element 1: Sensor Basics</>
			)
		}
		else if (path.startsWith("/lab/element-2")) {
			return (
				<><Cpu className="!size-7"/>Element 2: Combine & Create</>
			)
		}
		else if (path.startsWith("/lab/element-3")) {
			return (
				<><Flag className="!size-7"/>Element 3: Missions</>
			)
		}
		return (
			<><CustomHouse className="!size-7"/>Welcome</>
		)
	}

	return (
		<div className="fixed">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="flex items-center gap-2 text-3xl px-8 py-6
						hover:bg-zinc-100 dark:hover:bg-zinc-800 duration-100"
					>
						<GetCurrentElement />
						<ChevronDown className="h-6 w-6" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="text-lg">
					<DropdownMenuItem
						className="cursor-pointer text-2xl"
						onClick={() => navigate("/lab/welcome")}
					>
						<CustomHouse className="!size-6"/>
						Welcome
					</DropdownMenuItem>
					<DropdownMenuItem
						className="cursor-pointer text-2xl"
						onClick={() => navigate("/lab/element-1")}
					>
						<CircuitBoard className="!size-6"/>
						Element 1: Sensor Basics
					</DropdownMenuItem>
					<DropdownMenuItem
						className="cursor-pointer text-2xl"
						onClick={() => navigate("/lab/element-2")}
					>
						<Cpu className="!size-6"/>
						Element 2: Combine & Create
					</DropdownMenuItem>
					<DropdownMenuItem
						className="cursor-pointer text-2xl"
						onClick={() => navigate("/lab/element-3")}
					>
						<Flag className="!size-6"/>
						Element 3: Missions
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
