/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
	title?: string
	titleIcon?: React.ReactNode
	colorClass?: string
	hoverClass?: string
	disabled?: boolean
	onClick?: (e: any) => void | Promise<void>
	className?: string
	style?: object
}

export default function Button (props: Props) {
	const {
		title, titleIcon, colorClass, hoverClass,
		disabled, onClick, className, style
	} = props

	let backgroundColor
	let hoverColor
	if (disabled) {
		backgroundColor = "bg-zinc-400"
		hoverColor = "hover:bg-zinc-400"
	} else {
		backgroundColor = colorClass || ""
		hoverColor = hoverClass || ""
	}

	const extraClasses = `rounded p-2 ${backgroundColor} ${hoverColor} ${className}`

	return (
		<button
			type={onClick ? "button" : "submit"}
			className={`bg-pipTheme hover:bg-pipThemeHover ${extraClasses}`}
			onClick={onClick}
			disabled={disabled ?? false}
			style={style}
		>
			<span className="text-white flex items-center justify-center space-x-1">
				{title && <span>{title}</span>}
				{titleIcon && <span>{titleIcon}</span>}
			</span>
		</button>
	)
}
