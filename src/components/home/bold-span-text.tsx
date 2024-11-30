interface Props {
	extraClasses?: string
	children: React.ReactNode
}

export function BoldSpanText(props: Props) {
	const { extraClasses = "", children } = props

	return (
		<span className={`text-black dark:text-white ${extraClasses}`}>
			{ children }
		</span>
	)
}

export function BoldedDescription(props: Props) {
	const { extraClasses = "", children } = props
	return (
		<BoldSpanText extraClasses={`text-2xl font-bold ${extraClasses}`}>
			{children}
		</BoldSpanText>
	)
}
