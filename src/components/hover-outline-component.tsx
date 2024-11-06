import { useState } from "react"

interface Props {
	onClickAction?: () => void
	id?: string
	classes: string
	children: React.ReactNode
	top?: string
	circlePixelSize?: string
}

export default function HoverOutlineComponent(props: Props) {
	const { onClickAction, id, classes, children, top, circlePixelSize = "40px" } = props
	const [isHovered, setIsHovered] = useState(false)

	return (
		<div
			id={id}
			className={classes}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{
				backgroundColor: isHovered ? "rgba(128, 128, 128, 0.2)" : "transparent",
				height: circlePixelSize,
				width: circlePixelSize,
				borderRadius: "50%",
				cursor: "pointer",
				top: top
			}}
			onClick={onClickAction}
		>
			{children}
		</div>
	)
}
