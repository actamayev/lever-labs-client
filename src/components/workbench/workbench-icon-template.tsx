"use client"
import { cn } from "../../lib/shadcn/utils"
import { buttonVariants } from "../shadcn/ui/button"

interface Props {
	children: React.ReactNode
	extraButtonClasses?: string
}

export default function WorkbenchIconTemplate(props: Props) {
	const { children, extraButtonClasses = "" } = props

	return (
		<div
			className={cn(
				buttonVariants({
					variant: "ghost",
					size: "lg",
					className: cn(
						"relative flex flex-col items-center cursor-default justify-center hover:bg-standardBackground",
						"h-auto hover:text-current rounded-2xl p-0 outline-none",
						"border-2 border-transparent",
						"transition-none", // Add smooth transitions
						extraButtonClasses
					)
				})
			)}
		>
			<div className="flex flex-col items-center justify-center size-20">
				{children}
			</div>
		</div>
	)
}
