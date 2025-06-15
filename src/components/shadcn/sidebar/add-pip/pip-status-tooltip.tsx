"use client"

import { useMemo } from "react"
import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { cn } from "../../../../lib/shadcn/utils"
import CustomTooltip from "../../../custom-tooltip"
import pipClass from "../../../../classes/pip-class"

function PipStatusTooltip() {
	const getStatusColor = useMemo(() => {
		if (isNull(pipClass.selectedPip)) return ""
		switch (pipClass.selectedPip.pipConnectionStatus) {
		case "offline": return "bg-cardinal"
		case "online": return "bg-macaw"
		case "connected to other user": return "bg-beetle"
		case "connected": return "bg-green-500"
		default: return "bg-wolf"
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pipClass.selectedPip?.pipConnectionStatus])

	const getStatusMessage = useMemo(() => {
		if (isNull(pipClass.selectedPip)) return ""
		switch (pipClass.selectedPip.pipConnectionStatus) {
		case "offline": return `Please turn ${pipClass.selectedPip.pipName} on and connect it to the internet`
		case "online": return `${pipClass.selectedPip.pipName} is online and ready to connect`
		case "connected to other user": return `${pipClass.selectedPip.pipName} is connected to another user`
		case "connected": return "Connected"
		default: return "Unknown status"
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pipClass.selectedPip?.pipConnectionStatus])

	return (
		<CustomTooltip
			tooltipTrigger={
				<div
					className={cn(
						"absolute !h-[14px] !w-[14px] rounded-full bg-background",
						getStatusColor
					)}
					style={{ right: "2px", top: "3px" }}
				/>
			}
			contentSide="right"
			tooltipContent={getStatusMessage}
		/>
	)
}

export default observer(PipStatusTooltip)
