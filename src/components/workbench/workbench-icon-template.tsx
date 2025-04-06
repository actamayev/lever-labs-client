"use client"
import { MouseEventHandler } from "react"
import { cn } from "../../lib/shadcn/utils"
import { buttonVariants } from "../shadcn/ui/button"

interface Props {
	children: React.ReactNode
	extraButtonClasses?: string
	onMouseEnter: MouseEventHandler<HTMLDivElement> | undefined
}

export default function WorkbenchIconTemplate(props: Props) {
	const { children, extraButtonClasses = "", onMouseEnter } = props

	return (
		<div
			className={cn(
				buttonVariants({
					variant: "ghost",
					size: "lg",
					className: cn(
						"relative flex flex-col items-center cursor-default justify-center hover:bg-standardBackground",
						"h-auto hover:text-current rounded-2xl p-0 outline-none",
						"border-2 border-transparent rounded-b-none",
						extraButtonClasses
					)
				})
			)}
			onMouseEnter={onMouseEnter}
		>
			<div className="flex flex-col items-center justify-center size-20">
				{children}
			</div>
		</div>
	)
}
