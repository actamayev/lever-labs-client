import { useMemo } from "react"
import { isNull } from "lodash-es"
import { observer } from "mobx-react"
import { useWorkbenchContext } from "../../contexts/workbench-context"

function CardTemplate({ children } : { children: React.ReactNode }) {
	return (
		<div className="shadow-sm p-4 mb-4 min-h-24 border-[3px] border-swan rounded-2xl text-eel w-full">
			{children}
		</div>
	)
}
function WorkbenchCard() {
	const workbenchClass = useWorkbenchContext()

	const getTimeText = useMemo(() => {
		if (workbenchClass.isCharging) return "Estimated time to full charge:"
		return "Estimated time remaining:"
	}, [workbenchClass.isCharging])

	if (isNull(workbenchClass.workbenchItemToShow)) return null

	return (
		<CardTemplate>
			{workbenchClass.workbenchItemToShow === "battery" && (
				<>
					{getTimeText} 2 hours
				</>
			)}
			{workbenchClass.workbenchItemToShow === "network" && "Network"}
			{workbenchClass.workbenchItemToShow === "volume" && "Volume"}
		</CardTemplate>
	)
}

export default observer(WorkbenchCard)
