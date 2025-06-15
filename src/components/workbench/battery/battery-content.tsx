"use client"

import { useMemo } from "react"
import { observer } from "mobx-react"
import workbenchClass from "../../../classes/workbench-class"

function BatteryContent() {

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
