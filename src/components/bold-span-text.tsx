import { cn } from "@/lib/shadcn/utils"

type Props = {
	extraClasses?: string
	children: React.ReactNode
	noSpaceBefore?: boolean
	noSpaceAfter?: boolean
}

export function BoldSpanText(props: Props) {
	const {
		extraClasses,
		children,
		noSpaceBefore = false,
		noSpaceAfter = false
	} = props

	return (
		<>
			{!noSpaceBefore && <>&nbsp;</>}
			<span
				className={cn(
					"text-black dark:text-white font-semibold",
					extraClasses
				)}
			>
				{children}
			</span>
			{!noSpaceAfter && <>&nbsp;</>}
		</>
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
