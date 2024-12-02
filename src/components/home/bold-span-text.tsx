import { cn } from "@/lib/shadcn/utils"

interface Props {
	extraClasses?: string
	children: React.ReactNode
}

// TODO: look for all cases of class contatentation. repalce with cn
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
