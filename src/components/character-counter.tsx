import _ from "lodash"
import { cn } from "../lib/shadcn/utils"

interface Props {
	value: string | undefined
	characterLimit: number
	extraClasses?: string
}

export default function CharacterCounter(props: Props) {
	const { value, characterLimit, extraClasses = ""} = props

	if (_.isUndefined(value)) return null

	return (
		<div className={cn("absolute inset-y-0 flex items-center transition-all", extraClasses)}>
			<span className="text-sm text-muted-foreground">
				{value.length}/{characterLimit}
			</span>
		</div>

	)
}
