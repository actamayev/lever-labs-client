/* eslint-disable max-len */
import { Dispatch, SetStateAction, useCallback, useState } from "react"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../shadcn/ui/dropdown-menu"
import { Input } from "../../shadcn/ui/input"
import { cn } from "../../../lib/shadcn/utils"
import { buttonVariants } from "../../shadcn/ui/button"
import { DISPLAY_HEIGHT, DISPLAY_WIDTH, FONT_DATA, PRE_DEFINED_DESIGNS, Point } from "../../../utils/constants/display-constants"

interface ControlsColumnProps {
	setPixelBuffer: Dispatch<SetStateAction<boolean[][]>>
}

// eslint-disable-next-line max-lines-per-function
export default function ControlsColumn(props: ControlsColumnProps) {
	const { setPixelBuffer } = props
	const [textInput, setTextInput] = useState<string>("")
	const [selectedDesign, setSelectedDesign] = useState<string>("")

	// Set pixel in buffer
	const setPixelInBuffer = useCallback((x: number, y: number, state: boolean) => {
		if (x >= 0 && x < DISPLAY_WIDTH && y >= 0 && y < DISPLAY_HEIGHT) {
			setPixelBuffer((prev: boolean[][]) => {
				const newBuffer = prev.map((row: boolean[]) => [...row])
				newBuffer[y][x] = state
				return newBuffer
			})
		}
	}, [setPixelBuffer])

	// Clear buffer
	const clearBuffer = useCallback(() => {
		setPixelBuffer(Array(DISPLAY_HEIGHT).fill(null).map(() => Array(DISPLAY_WIDTH).fill(false)))
	}, [setPixelBuffer])

	// Apply design to buffer
	const applyDesignToBuffer = useCallback((designName: string) => {
		const design = PRE_DEFINED_DESIGNS.find(d => d.name === designName)
		if (!design) return

		clearBuffer()
		design.pixels.forEach((pixel: Point) => {
			setPixelInBuffer(pixel.x, pixel.y, true)
		})
	}, [clearBuffer, setPixelInBuffer])

	// Apply text to buffer
	const applyTextToBuffer = useCallback(() => {
		if (!textInput.trim()) return

		clearBuffer()
		let x = 8 // Starting X position
		const y = 28 // Starting Y position

		for (const char of textInput.toUpperCase()) {
			const fontData = FONT_DATA[char]

			for (let col = 0; col < 5; col++) {
				for (let row = 0; row < 8; row++) {
					// eslint-disable-next-line max-depth
					if (fontData[col] & (1 << row)) {
						setPixelInBuffer(x + col, y + row, true)
					}
				}
			}
			x += 6 // 5 pixels + 1 space
			if (x >= DISPLAY_WIDTH - 5) break // Don't overflow
		}
	}, [clearBuffer, setPixelInBuffer, textInput])

	return (
		<div className="space-y-8 ml-12">
			{/* Pre-defined designs dropdown */}
			<div className="flex flex-col items-center gap-4">
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
								onClick={() => setSelectedDesign(design.name)}
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
				<div className="flex justify-center">
					<button
						onClick={() => applyDesignToBuffer(selectedDesign)}
						disabled={!selectedDesign}
						className={`transition-all duration-200 ${
							selectedDesign
								? "hover:scale-110 cursor-pointer"
								: "opacity-50 cursor-not-allowed"
						}`}
						title={selectedDesign ? "Apply selected design" : "Select a design first"}
					>
						<div
							className={`w-0 h-0 border-l-[16px] border-t-[12px] border-b-[12px]
					border-t-transparent border-b-transparent transition-colors duration-200 ${
		selectedDesign
			? "border-l-blue-500 hover:border-l-blue-400"
			: "border-l-gray-600"
		}`}></div>
					</button>
				</div>
			</div>

			{/* Text input */}
			<div className="flex flex-row justify-center gap-4">
				<Input
					placeholder="Enter text..."
					value={textInput}
					onChange={(e) => setTextInput(e.target.value)}
					className="border-2 pr-6 border-swan rounded-xl !text-xl text-center bg-inherit shadow-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0"
					style={{ width: "210px", height: "52px" }}
				/>
				<div className="flex justify-center">
					<button
						onClick={applyTextToBuffer}
						disabled={!textInput.trim()}
						className={`transition-all duration-200 ${
							textInput.trim()
								? "hover:scale-110 cursor-pointer"
								: "opacity-50 cursor-not-allowed"
						}`}
						title={textInput.trim() ? "Apply entered text" : "Enter text first"}
					>
						<div
							className={`w-0 h-0 border-l-[16px] border-t-[12px] border-b-[12px]
							border-t-transparent border-b-transparent transition-colors duration-200 ${
		textInput.trim()
			? "border-l-green-500 hover:border-l-green-400"
			: "border-l-gray-600"
		}`}></div>
					</button>
				</div>
			</div>
		</div>
	)
}
