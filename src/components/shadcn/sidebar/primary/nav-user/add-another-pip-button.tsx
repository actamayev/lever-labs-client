"use client"

import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import { Bot, PlusCircle } from "lucide-react"
import { DropdownMenuItem } from "../../../ui/dropdown-menu"
import { usePipContext } from "../../../../../contexts/pip-context"
import useTypedNavigate from "../../../../../hooks/navigate/typed-navigate"

function AddAnotherPipButton() {
	const navigate = useTypedNavigate()
	const pipClass = usePipContext()

	if (isEmpty(pipClass.pipData)) return null

	return (
		<DropdownMenuItem
			onSelect={() => navigate("/add-pip")}
			className="hover:cursor-pointer my-1.5"
		>
			<div className="relative mr-2 flex items-center justify-center">
				<Bot className="!h-[25px] !w-[25px] !min-w-[25px] text-blue-600 dark:text-blue-400" />
				<PlusCircle className="absolute -right-1 -top-1 !h-[15px] !w-[15px] bg-background rounded-full" />
			</div>
			<span className="text-base">Add another Pip</span>
		</DropdownMenuItem>
	)
}

export default observer(AddAnotherPipButton)
