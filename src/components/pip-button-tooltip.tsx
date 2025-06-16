"use client"

import isNull from "lodash-es/isNull"
import toUpper from "lodash-es/toUpper"
import { observer } from "mobx-react"
import pipClass from "../classes/pip-class"

function PipButtonTooltip() {
	if (isNull(pipClass.selectedPip)) {
		return "Add a Pip"
	} else if (pipClass.selectedPip.pipConnectionStatus === "connected") {
		return "DISCONNECT"
	} else if (pipClass.selectedPip.pipConnectionStatus === "offline") {
		return "OFFLINE"
	} else if (pipClass.selectedPip.pipConnectionStatus === "online") {
		return "CONNECT"
	}
	return toUpper(pipClass.selectedPip.pipConnectionStatus)
}

export default observer(PipButtonTooltip)
