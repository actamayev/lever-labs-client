"use client"

import { observer } from "mobx-react"
import { ChevronDown } from "lucide-react"
import { Input } from "../../shadcn/ui/input"
import { cn } from "../../../lib/shadcn/utils"
import { buttonVariants } from "../../shadcn/ui/button"
import garageClass from "../../../classes/garage-class"
import DisplayActionTriangle from "./display-action-triangle"
import { PRE_DEFINED_DESIGNS } from "../../../utils/constants/display-constants"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../shadcn/ui/dropdown-menu"

function DisplayControls () {
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
										px-4 !py-6 w-full \
										border-2 shadow-none !text-xl cursor-pointer"
								})
							)}
							style={{ height: "60px" }}
						>
							<span className="flex items-center gap-2">
								{garageClass.selectedDesign}
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
								onClick={() => garageClass.setSelectedDesign(design.name)}
								className="cursor-pointer transition-none hover:!bg-polar rounded-lg text-xl"
							>
								{design.name}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
				<div className="flex justify-center">
					<DisplayActionTriangle
						applyToBuffer={() => garageClass.applyDesignToBuffer(garageClass.selectedDesign)}
						isEmpty={garageClass.selectedDesign === "No design"}
						isActive={garageClass.isDesignOrTextActive === "design"}
					/>
				</div>
			</div>

			{/* Text input */}
			<div className="flex flex-row gap-4">
				<Input
					placeholder="Enter text..."
					value={garageClass.textInput}
					onChange={(e) => garageClass.setTextInput(e.target.value)}
					className={cn(
						"border-2 pr-6 border-swan rounded-2xl !text-xl text-start bg-inherit shadow-none",
						"[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
						"[&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 font-medium"
					)}
					style={{ height: "60px" }}
				/>
				<div className="flex justify-center">
					<DisplayActionTriangle
						applyToBuffer={garageClass.applyTextToBuffer}
						isEmpty={!garageClass.textInput.trim()}
						isActive={garageClass.isDesignOrTextActive === "text"}
					/>
				</div>
			</div>
		</div>
	)
}

export default observer(DisplayControls)
