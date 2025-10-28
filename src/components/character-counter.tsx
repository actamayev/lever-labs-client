"use client"

import { cn } from "../lib/utils"
import isUndefined from "lodash-es/isUndefined"

interface Props {
	value: string | undefined
	characterLimit: number
	extraClasses?: string
}

export default function CharacterCounter(props: Props): React.ReactNode {
	const { value, characterLimit, extraClasses = ""} = props

	if (isUndefined(value)) return null

	return (
		<div className={cn("absolute top-1/2 -translate-y-1/2 flex items-center transition-all", extraClasses)}>
			<span className="text-sm text-muted-foreground">
				{value.length}/{characterLimit}
			</span>
		</div>
	)
}
