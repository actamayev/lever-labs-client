import HoverOutlineComponent from "./hover-outline-component"

interface Props {
	checkedCondition: boolean | undefined
	onChangeCheckedCondition: () => void
	disabledCondition?: boolean
	colorChangeOnToggle?: boolean
	leftIcon?: React.ReactNode
	rightIcon?: React.ReactNode
	id?: string
}

export default function Slider(props: Props) {
	const { checkedCondition, onChangeCheckedCondition, disabledCondition, colorChangeOnToggle, leftIcon, rightIcon, id } = props

	return (
		<HoverOutlineComponent
			id={id}
			classes="relative flex items-center justify-center inline-block"
			onClickAction={onChangeCheckedCondition}
		>
			<label
				className="relative inline-block cursor-pointer"
				style={{
					width: "30px",
					height: "17px",
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					pointerEvents: "none"
				}}
			>
				<input
					type="checkbox"
					checked={checkedCondition}
					onChange={onChangeCheckedCondition}
					disabled={disabledCondition}
					style={{ opacity: 0, width: 0, height: 0 }}
				/>
				<span
					className="absolute inset-0 transition cursor-pointer"
					style={{
						backgroundColor: "#ccc",
						borderRadius: "17px",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						transition: ".05s",
						pointerEvents: "none"
					}}
				/>
				<span
					className={
						`absolute rounded-full transition-transform flex items-center justify-center cursor-pointer \
							${colorChangeOnToggle && checkedCondition ? "bg-pipTheme" : "bg-zinc-50 dark:bg-zinc-950"}`
					}
					style={{
						height: "13px",
						width: "13px",
						left: "2px",
						bottom: "2px",
						transform: checkedCondition ? "translateX(13px)" : "translateX(0)",
						transition: ".05s",
						borderRadius: "50%",
						pointerEvents: "auto"
					}}
				>
					{checkedCondition && rightIcon}
					{!checkedCondition && leftIcon}
				</span>
			</label>
		</HoverOutlineComponent>
	)
}
