/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
	title?: string
	titleIcon?: React.ReactNode
	colorClass: string
	hoverClass: string
	disabled?: boolean
	onClick?: (e: any) => void | Promise<void>
	className?: string
	style?: object
}

export default function Button (props: Props) {
	let backgroundColor
	let hoverColor
	if (props.disabled) {
		backgroundColor = "bg-zinc-400"
		hoverColor = ""
	} else {
		backgroundColor = props.colorClass || "bg-zinc-950"
		hoverColor = props.hoverClass || ""
	}

	const css = `rounded p-2 ${backgroundColor} ${hoverColor} ${props.className}`

	return (
		<button
			type={props.onClick ? "button" : "submit"}
			className={css}
			onClick={props.onClick}
			disabled={props.disabled ?? false}
			style={props.style}
		>
			<span className="flex items-center justify-center space-x-1">
				{props.title && <span>{props.title}</span>}
				{props.titleIcon && <span>{props.titleIcon}</span>}
			</span>
		</button>
	)
}
