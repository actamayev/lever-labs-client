import { useMemo } from "react"
import workbenchClass from "../../classes/workbench-class"

export default function useGetBatteryColorClasses(): string {
	return useMemo(() => {
		if (!workbenchClass.batteryData) return "opacity-50 text-cardinal"
		if (workbenchClass.batteryData.isCharging) return "text-chargingGreen"
		if (workbenchClass.batteryData.stateOfCharge <= 20) return "text-cardinal"
		else if (workbenchClass.batteryData.stateOfCharge <= 40) return "text-bee"
		else if (workbenchClass.batteryData.stateOfCharge <= 70) return "text-fox"
		return "text-macaw"
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workbenchClass.batteryData?.isCharging, workbenchClass.batteryData?.stateOfCharge])
}
