import { useCallback } from "react"
import { ChevronsDown, ChevronsUp } from "lucide-react"
import { Button } from "../../../ui/button"

interface Props {
	navData: LabNavData[]
	openSections: Record<string, boolean>
	setOpenSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}

export default function ToggleAllLessons(props: Props) {
	const { navData, openSections, setOpenSections } = props

	const toggleAll = useCallback((open: boolean) => {
		const newState: Record<string, boolean> = {}
		navData.forEach((item) => {
			newState[item.title] = open
		})
		setOpenSections(newState)
	}, [navData, setOpenSections])

	return (
		<Button
			onClick={() => toggleAll(Object.values(openSections).some(v => !v))}
			className="py-1 px-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors duration-75"
			title={Object.values(openSections).some(v => !v) ? "Expand all" : "Collapse all"}
			variant="ghost"
		>
			{Object.values(openSections).some(v => !v) ? (
				<ChevronsDown className="w-4 h-4" />
			) : (
				<ChevronsUp className="w-4 h-4" />
			)}
		</Button>
	)
}
