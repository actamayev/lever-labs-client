"use client"

import { useMemo } from "react"
import { TriangleIcon } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import CustomTooltip from "../../custom-tooltip"

interface DisplayActionTriangleProps {
	applyToBuffer: () => void
	isEmpty: boolean
	isActive: boolean
	isDisabled?: boolean
	emptyTooltipContent: string
	tooltipContent: string
}

export default function DisplayActionTriangle(props: DisplayActionTriangleProps): React.ReactNode {
	const { applyToBuffer, isEmpty, isActive, isDisabled = false, emptyTooltipContent = "", tooltipContent = "" } = props

	const triangleStyles = useMemo((): string => {
		if (isDisabled) {
			return "fill-gray-300 text-gray-400"
		}
		if (isActive) {
			return "text-charging-green fill-charging-green"
		}
		if (isEmpty) {
			return "fill-standard-background text-hare"
		}
		return "text-macaw fill-macaw"
	}, [isActive, isEmpty, isDisabled])

	const getTooltipContent = (): string => {
		if (isDisabled) return "Display disabled by teacher"
		if (isEmpty) return emptyTooltipContent
		return tooltipContent
	}

	const buttonContent = (
		<div className="relative">
			<button
				onClick={applyToBuffer}
				disabled={isEmpty || isDisabled}
				className={cn("transition-all duration-200",
					!isEmpty && !isDisabled
						? "hover:scale-110 cursor-pointer"
						: "cursor-not-allowed"
				)}
			>
				<TriangleIcon
					className={cn(
						"transition-colors duration-200 rotate-90",
						triangleStyles
					)}
					style={{ width: "60px", height: "60px" }}
					strokeWidth={1.5}
				/>
			</button>
			{/* Invisible overlay for tooltip when disabled */}
			{isDisabled && (
				<div className="absolute inset-0 cursor-not-allowed" />
			)}
		</div>
	)

	return (
		<CustomTooltip
			tooltipTrigger={buttonContent}
			tooltipContent={getTooltipContent()}
		/>
	)
}
