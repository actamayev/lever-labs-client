import { cn } from "@/lib/shadcn/utils"

interface Props {
	extraClasses?: string
	children: React.ReactNode
}

export function BoldSpanText(props: Props) {
	const { extraClasses, children } = props

	return (
		<span
			className={cn(
				"text-black dark:text-white font-semibold",
				extraClasses
			)}
		>
			{children}
		</span>
	)
}

export function BoldedDescription(props: Props) {
	const { extraClasses, children } = props

	return (
		<BoldSpanText extraClasses={cn(
			"text-2xl font-bold",
			extraClasses
		)}>
			{children}
		</BoldSpanText>
	)
}
