"use client"
import { cn } from "../../lib/shadcn/utils"
import { buttonVariants } from "../shadcn/ui/button"

interface Props {
	children: React.ReactNode
}

export default function WorkbenchIconTemplate(props: Props): React.ReactNode {
	const { children } = props

	return (
		<div
			className={cn(
				buttonVariants({
					variant: "ghost",
					size: "lg",
					className: cn(
						"relative flex flex-col items-center cursor-default justify-center",
						"h-auto hover:text-current rounded-2xl p-0 outline-hidden",
						"transition-none", // Add smooth transitions
						"bg-inherit hover:bg-inherit"
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
