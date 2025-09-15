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
import CustomTooltip from "../../custom-tooltip"

// eslint-disable-next-line max-lines-per-function
function DisplayControls(): React.ReactNode {
	// Check if display should be disabled
	const isDisabled = !garageClass.garageDisplayStatus

	// Render dropdown with conditional tooltip
	const renderDropdown = (): React.ReactNode => {
		const dropdownContent = (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div
						className={cn(
							buttonVariants({
								variant: "outline",
								className: cn(
									"flex items-center gap-1 rounded-2xl justify-between",
									"px-4 !py-6 w-full border-2 shadow-none !text-xl",
									isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
								)
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
					{PRE_DEFINED_DESIGNS.map((design): React.ReactNode => (
						<DropdownMenuItem
							key={design.name}
							onClick={(): void => {
								if (!isDisabled) {
									garageClass.setSelectedDesign(design.name)
								}
							}}
							className={cn(
								"transition-none hover:!bg-polar rounded-lg text-xl",
								isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
							)}
						>
							{design.name}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		)

		// Only wrap with tooltip when disabled
		if (isDisabled) {
			return (
				<CustomTooltip
					tooltipTrigger={
						<div className="relative w-full">
							{dropdownContent}
							<div className="absolute inset-0 cursor-not-allowed" />
						</div>
					}
					tooltipContent="Display disabled by teacher"
				/>
			)
		}

		return dropdownContent
	}

	// Render text input with conditional tooltip
	const renderTextInput = (): React.ReactNode => {
		const inputContent = (
			<Input
				placeholder="Enter text..."
				value={garageClass.textInput}
				onChange={(e): void => {
					if (!isDisabled) {
						garageClass.setTextInput(e.target.value)
					}
				}}
				onKeyDown={(e): void => {
					if (e.key === "Enter" && garageClass.textInput.trim() && !isDisabled) {
						void garageClass.applyTextToBuffer()
					}
				}}
				className={cn(
					"border-2 pr-6 border-swan rounded-2xl !text-xl text-start bg-inherit shadow-none",
					"[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
					"[&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 font-medium",
					isDisabled && "opacity-50 cursor-not-allowed"
				)}
				style={{ height: "60px" }}
				disabled={isDisabled}
			/>
		)

		// Only wrap with tooltip when disabled
		if (isDisabled) {
			return (
				<CustomTooltip
					tooltipTrigger={
						<div className="relative w-full">
							{inputContent}
							<div className="absolute inset-0 cursor-not-allowed" />
						</div>
					}
					tooltipContent="Display disabled by teacher"
				/>
			)
		}

		return inputContent
	}

	return (
		<div className="space-y-8">
			{/* Pre-defined designs dropdown */}
			<div className="flex flex-row items-center gap-4">
				{renderDropdown()}
				<div className="flex justify-center">
					<DisplayActionTriangle
						applyToBuffer={(): void => {
							if (!isDisabled) {
								void garageClass.applyDesignToBuffer(garageClass.selectedDesign)
							}
						}}
						isEmpty={garageClass.selectedDesign === "No design" || isDisabled}
						isActive={garageClass.designOnBuffer === garageClass.selectedDesign && garageClass.designOnBuffer !== "No design"}
						isDisabled={isDisabled}
					/>
				</div>
			</div>

			{/* Text input */}
			<div className="flex flex-row gap-4">
				{renderTextInput()}
				<div className="flex justify-center">
					<DisplayActionTriangle
						applyToBuffer={(): void => {
							if (!isDisabled) {
								void garageClass.applyTextToBuffer()
							}
						}}
						isEmpty={!garageClass.textInput.trim() || isDisabled}
						isActive={(garageClass.textOnBuffer === garageClass.textInput) && (garageClass.textInput.trim() !== "")}
						isDisabled={isDisabled}
					/>
				</div>
			</div>
		</div>
	)
}

export default observer(DisplayControls)
