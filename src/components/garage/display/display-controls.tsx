"use client"

import { Dispatch, SetStateAction, useCallback, useState } from "react"
import { ChevronDown, TriangleIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../shadcn/ui/dropdown-menu"
import { Input } from "../../shadcn/ui/input"
import { cn } from "../../../lib/shadcn/utils"
import { buttonVariants } from "../../shadcn/ui/button"
import { DISPLAY_HEIGHT, DISPLAY_WIDTH, FONT_DATA, PRE_DEFINED_DESIGNS, Point } from "../../../utils/constants/display-constants"

interface DisplayControlsProps {
	setPixelBuffer: Dispatch<SetStateAction<PixelBuffer>>
}

// eslint-disable-next-line max-lines-per-function
export default function DisplayControls(props: DisplayControlsProps) {
	const { setPixelBuffer } = props
	const [textInput, setTextInput] = useState<string>("")
	const [selectedDesign, setSelectedDesign] = useState<string>("")

	// Set pixel in buffer
	const setPixelInBuffer = useCallback((x: number, y: number, state: boolean) => {
		if (x >= 0 && x < DISPLAY_WIDTH && y >= 0 && y < DISPLAY_HEIGHT) {
			setPixelBuffer((prev: PixelBuffer) => {
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
		<div className="space-y-8">
			{/* Pre-defined designs dropdown */}
			<div className="flex flex-row items-center gap-4">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div
							className={cn(
								buttonVariants({
									variant: "outline",
									className: "flex items-center gap-1 rounded-2xl justify-between \
										px-4 !py-6 font-medium w-full \
										border-2 shadow-none !text-xl cursor-pointer"
								})
							)}
							style={{ height: "60px" }}
						>
							<span className="flex items-center gap-2">
								{selectedDesign || "Select design..."}
							</span>
							<ChevronDown className="!size-6" />
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="rounded-xl bg-standardBackground mt-1 w-56 max-h-44 overflow-y-auto border-2 shadow-none border-swan"
					>
						{PRE_DEFINED_DESIGNS.map((design) => (
							<DropdownMenuItem
								key={design.name}
								onClick={() => setSelectedDesign(design.name)}
								className="cursor-pointer transition-none hover:!bg-polar rounded-lg text-xl"
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
						className={cn("transition-all duration-200",
							selectedDesign
								? "hover:scale-110 cursor-pointer"
								: "cursor-not-allowed"
						)}
						title={selectedDesign ? "Apply selected design" : "Select a design first"}
					>
						<TriangleIcon
							className={cn(
								"transition-colors duration-200 rotate-90",
								selectedDesign
									? "text-macaw fill-macaw"
									: "fill-standardBackground text-hare"
							)}
							style={{ width: "60px", height: "60px" }}
						/>
					</button>
				</div>
			</div>

			{/* Text input */}
			<div className="flex flex-row gap-4">
				<Input
					placeholder="Enter text..."
					value={textInput}
					onChange={(e) => setTextInput(e.target.value)}
					className={cn(
						"border-2 pr-6 border-swan rounded-2xl !text-xl text-start bg-inherit shadow-none",
						"[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
						"[&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0"
					)}
					style={{ height: "60px" }}
				/>
				<div className="flex justify-center">
					<button
						onClick={applyTextToBuffer}
						disabled={!textInput.trim()}
						className={cn("transition-all duration-200",
							textInput.trim()
								? "hover:scale-110 cursor-pointer"
								: "cursor-not-allowed"
						)}
						title={textInput.trim() ? "Apply entered text" : "Enter text first"}
					>
						<TriangleIcon
							className={cn(
								"transition-colors duration-200 rotate-90",
								textInput.trim()
									? "text-macaw fill-macaw"
									: "fill-standardBackground text-hare"
							)}
							style={{ width: "60px", height: "60px" }}
						/>
					</button>
				</div>
			</div>
		</div>
	)
}
