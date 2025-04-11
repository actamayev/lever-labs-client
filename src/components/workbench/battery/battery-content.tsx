"use client"

import { useMemo } from "react"
import { observer } from "mobx-react"
import { useWorkbenchContext } from "../../../contexts/workbench-context"

function BatteryContent() {
	const workbenchClass = useWorkbenchContext()

	const getTimeText = useMemo(() => {
		if (workbenchClass.isCharging) return "Estimated time to full charge:"
		return "Estimated time remaining:"
	}, [workbenchClass.isCharging])

	return (
		<>
			{getTimeText} 2 hours
		</>
	)
}

export default observer(BatteryContent)
