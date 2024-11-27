import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/shadcn/utils"
import { Button } from "@/components/shadcn/ui/button"
import { usePipContext } from "../../contexts/pip-context"

interface Props {
	isDropdownOpen: boolean
	setIsDropdownOpen: (value: React.SetStateAction<boolean>) => void
}

function DropdownArrow(props: Props) {
	const { isDropdownOpen, setIsDropdownOpen } = props
	const pipClass = usePipContext()

	const toggleDropdown = useCallback((e: React.MouseEvent) => {
		e.stopPropagation()
		setIsDropdownOpen(prev => !prev)
	}, [setIsDropdownOpen])

	if (_.isEmpty(pipClass.pipData)) return null

	return (
		<Button
			variant="ghost"
			size="icon"
			className={cn(
				"h-full px-2 rounded-none rounded-r-lg border-l border-zinc-300",
				"dark:border-zinc-600 hover:bg-zinc-200 dark:hover:bg-zinc-700"
			)}
			onClick={toggleDropdown}
		>
			<ChevronDown
				className={cn(
					"h-5 w-5 transition-transform duration-200",
					isDropdownOpen && "rotate-180"
				)}
			/>
		</Button>
	)
}

export default observer(DropdownArrow)
