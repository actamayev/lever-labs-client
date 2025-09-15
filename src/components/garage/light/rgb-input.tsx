/* eslint-disable max-len */
"use client"

import { useCallback } from "react"
import { observer } from "mobx-react"
import { Input } from "../../shadcn/ui/input"
import { Label } from "../../shadcn/ui/label"
import garageClass from "../../../classes/garage-class"
import CustomTooltip from "../../custom-tooltip"

function RGBInput(): React.ReactNode {
	// Function to enforce RGB range (0-255)
	const enforceRGBRange = useCallback((value: string): number => {
		const numValue = parseInt(value || "0")
		return Math.min(Math.max(numValue, 0), 255)
	}, [])

	// Handle input event to prevent leading zeros
	const handleInput = useCallback((e: React.FormEvent<HTMLInputElement>): void => {
		const input = e.currentTarget // use currentTarget which is properly typed
		const value = input.value

		// If value has leading zeros (except for a single 0), remove them
		if (value.length > 1 && value.startsWith("0")) {
			input.value = value.replace(/^0+/, "")
		}
	}, [])

	const isDisabled = !garageClass.garageLightsStatus

	const channel = (
		(id: string, label: string, value: number, onChange: (n: number) => void, borderClass: string, bgClass: string): React.ReactNode => (
			<div className="flex items-center flex-col">
				<Label htmlFor={id} className="text-xl font-medium mb-0.5">{label}</Label>
				<Input
					id={id}
					type="number"
					value={value}
					onInput={handleInput}
					onChange={(e): void => { if (!isDisabled) onChange(enforceRGBRange(e.target.value)) }}
					min="0"
					max="255"
					className={`border-2 ${borderClass} rounded-xl !text-xl text-center ${bgClass} shadow-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
					style={{ width: "72px", height: "52px" }}
					disabled={isDisabled}
				/>
			</div>
		)
	)

	const content = (
		<>
			{channel("rgb-r", "R", Math.round(garageClass.selectedColorRgba.r * garageClass.selectedColorShade), (n): void => garageClass.updateSelectedColorByField("r", n), "border-red-300 dark:border-red-700", "bg-red-300 dark:bg-red-700")}
			{channel("rgb-g", "G", Math.round(garageClass.selectedColorRgba.g * garageClass.selectedColorShade), (n): void => garageClass.updateSelectedColorByField("g", n), "border-green-300 dark:border-green-700", "bg-green-300 dark:bg-green-700")}
			{channel("rgb-b", "B", Math.round(garageClass.selectedColorRgba.b * garageClass.selectedColorShade), (n): void => garageClass.updateSelectedColorByField("b", n), "border-blue-200 dark:border-blue-800", "bg-blue-200 dark:bg-blue-800")}
		</>
	)

	return (
		<div className="relative flex items-center gap-3 w-full">
			{content}
			{isDisabled && (
				<CustomTooltip
					tooltipTrigger={<div className="absolute inset-0 cursor-not-allowed" />}
					tooltipContent="Lights disabled by teacher"
				/>
			)}
		</div>
	)
}

export default observer(RGBInput)
