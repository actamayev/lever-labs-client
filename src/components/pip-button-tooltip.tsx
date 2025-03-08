import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { usePipContext } from "../contexts/pip-context"

function PipButtonTooltip() {
	const pipClass = usePipContext()

	if (isNull(pipClass.selectedPip)) {
		return <>Add a Pip</>
	} else if (pipClass.selectedPip.pipConnectionStatus === "connected") {
		return <>Disconnect from {pipClass.selectedPip.pipName}</>
	}
	return <>Connect to {pipClass.selectedPip.pipName}</>
}

export default observer(PipButtonTooltip)
