/* eslint-disable max-len */
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../shadcn/ui/dropdown-menu"
import { Input } from "../../shadcn/ui/input"
import { PRE_DEFINED_DESIGNS } from "../../../utils/constants/display-constants"
import { buttonVariants } from "../../shadcn/ui/button"
import { cn } from "../../../lib/shadcn/utils"
import { ChevronDown } from "lucide-react"

interface ControlsColumnProps {
	selectedDesign: string
	textInput: string
	onDesignChange: (design: string) => void
	onTextChange: (text: string) => void
}

export default function ControlsColumn(props: ControlsColumnProps) {
	const { selectedDesign, textInput, onDesignChange, onTextChange } = props

	return (
		<div className="space-y-8 ml-12">
			{/* Pre-defined designs dropdown */}
			<div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div
							className={cn(
								buttonVariants({
									variant: "outline",
									className: "flex items-center gap-1 rounded-xl justify-between text-questionText \
										px-4 !py-6 font-medium cursor-pointer w-full border-2 border-swan hover:bg-swan shadow-none !text-xl"
								})
							)}
							style={{ height: "52px" }}
						>
							<span className="flex items-center gap-2">
								{selectedDesign || "Select design..."}
							</span>
							<ChevronDown className="!size-6" />
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="rounded-xl bg-standardBackground mt-1 w-72 max-h-44 overflow-y-auto border-2 shadow-none">
						{PRE_DEFINED_DESIGNS.map((design) => (
							<DropdownMenuItem
								key={design.name}
								onClick={() => onDesignChange(design.name)}
								className={cn(
									"my-0.5 p-2 rounded-xl cursor-pointer text-sm transition-none flex items-center space-x-2 hover:!bg-polar",
									selectedDesign === design.name
										? "!bg-polar border-l-4 border-l-blue-500"
										: "hover:!bg-polar border-l-4 border-l-transparent"
								)}
							>
								{design.name}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* Text input */}
			<div>
				<Input
					placeholder="Enter text..."
					value={textInput}
					onChange={(e) => onTextChange(e.target.value)}
					className="border-2 pr-6 border-swan rounded-xl !text-xl text-center bg-inherit shadow-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0"
					style={{ width: "210px", height: "52px" }}
				/>
			</div>
		</div>
	)
}
