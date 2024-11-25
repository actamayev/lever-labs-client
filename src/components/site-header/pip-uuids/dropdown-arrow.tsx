import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { usePipContext } from "../../../contexts/pip-context"

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
		<div
			className="flex items-center px-2 cursor-pointer hover:bg-zinc-300
				dark:hover:bg-zinc-600 rounded-r-lg border-l border-slate-300 dark:border-slate-600"
			onClick={toggleDropdown}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className={`h-5 w-5 transform transition-transform ${
					isDropdownOpen ? "rotate-180" : "rotate-0"
				}`}
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
			</svg>
		</div>
	)
}

export default observer(DropdownArrow)
