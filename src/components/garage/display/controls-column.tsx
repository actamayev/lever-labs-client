import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../shadcn/ui/dropdown-menu"
import { Input } from "../../shadcn/ui/input"
import { PRE_DEFINED_DESIGNS } from "../../../utils/constants/display-constants"

interface ControlsColumnProps {
	selectedDesign: string
	textInput: string
	onDesignChange: (design: string) => void
	onTextChange: (text: string) => void
}

export default function ControlsColumn(props: ControlsColumnProps) {
	const { selectedDesign, textInput, onDesignChange, onTextChange } = props

	return (
		<div className="space-y-8">
			{/* Pre-defined designs dropdown */}
			<div>
				<DropdownMenu>
					<DropdownMenuTrigger
						className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2
						text-left text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
						{selectedDesign || "Select design..."}
					</DropdownMenuTrigger>
					<DropdownMenuContent className="bg-gray-800 border-gray-700">
						{PRE_DEFINED_DESIGNS.map((design) => (
							<DropdownMenuItem
								key={design.name}
								onClick={() => onDesignChange(design.name)}
								className="text-white hover:bg-gray-700 cursor-pointer"
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
					className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400"
				/>
			</div>
		</div>
	)
}
