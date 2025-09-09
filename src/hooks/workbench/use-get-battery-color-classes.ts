import { useMemo } from "react"
import getWorkbenchClass from "../../classes/workbench-class"

export default function useGetBatteryColorClasses(): string {
	return useMemo((): string => {
		const batteryData = getWorkbenchClass().batteryData
		if (!batteryData) return "opacity-50 text-cardinal"
		if (batteryData.isCharging) return "text-chargingGreen"
		if (batteryData.stateOfCharge <= 20) return "text-cardinal"
		else if (batteryData.stateOfCharge <= 40) return "text-bee"
		else if (batteryData.stateOfCharge <= 70) return "text-fox"
		return "text-macaw"
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getWorkbenchClass().batteryData?.isCharging, getWorkbenchClass().batteryData?.stateOfCharge])
}
