import { Switch } from "@/components/shadcn/ui/switch"
import { cn } from "../lib/shadcn/utils"

interface SliderProps {
	checkedCondition: boolean
	onChangeCheckedCondition: () => void
	disabledCondition?: boolean
	colorChangeOnToggle?: boolean
	id?: string
}

export default function Slider(props: SliderProps) {
	const { checkedCondition, onChangeCheckedCondition, disabledCondition, colorChangeOnToggle, id } = props

	return (
		<Switch
			id={id}
			checked={checkedCondition}
			onCheckedChange={onChangeCheckedCondition}
			disabled={disabledCondition}
			className={cn(
				"dark:bg-zinc-400",
				colorChangeOnToggle && "data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500"
			)}
		/>
	)
}
