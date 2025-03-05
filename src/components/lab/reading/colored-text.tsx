import { cn } from "../../../lib/shadcn/utils"

type Props = {
	extraClasses?: string
	children: React.ReactNode
	noSpaceBefore?: boolean
	noSpaceAfter?: boolean
}

export function BlueColoredText (props: Props) {
	const {
		extraClasses,
		children,
		noSpaceBefore = false,
		noSpaceAfter = false
	} = props

	return (
		<>
			{!noSpaceBefore && <>&nbsp;</>}
			<span className={cn(
				"font-bold text-blue-600 dark:text-blue-400",
				extraClasses
			)}>
				{children}
			</span>
			{!noSpaceAfter && <>&nbsp;</>}
		</>
	)
}

export function OrangeColoredText (props: Props) {
	const {
		extraClasses,
		children,
		noSpaceBefore = false,
		noSpaceAfter = false
	} = props

	return (
		<>
			{!noSpaceBefore && <>&nbsp;</>}
			<span className={cn(
				"font-bold text-orange-600 dark:text-orange-400",
				extraClasses
			)}>
				{children}
			</span>
			{!noSpaceAfter && <>&nbsp;</>}
		</>
	)
}
