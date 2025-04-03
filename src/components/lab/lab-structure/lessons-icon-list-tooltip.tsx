"use client"

import { cn } from "../../../lib/shadcn/utils"
import CustomTooltip from "../../custom-tooltip"
import { Button } from "../../shadcn/ui/button"

interface Props {
	tooltipMessage: string
	children: React.ReactNode
	onClick: () => void
	isActive: boolean
}

export default function LessonsIconListTooltip(props: Props) {
	const { tooltipMessage, children, onClick, isActive } = props

	return (
		<CustomTooltip
			tooltipTrigger={
				<Button
					variant="ghost"
					className={cn(
						"flex size-12 items-center justify-center rounded-lg duration-0 hover:bg-polar",
						isActive && "bg-polar"
					)}
					onClick={onClick} // Add the onClick handler directly to the Button
				>
					{children}
				</Button>
			}
			tooltipContent={tooltipMessage}
			contentSide="bottom"
		/>
	)
}
