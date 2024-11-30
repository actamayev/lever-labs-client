interface Props {
	extraClasses?: string
	children: React.ReactNode
}

export default function BoldSpanText(props: Props) {
	const { extraClasses = "", children } = props

	return (
		<span className={`text-black dark:text-white ${extraClasses}`}>
			{ children }
		</span>
	)
}
