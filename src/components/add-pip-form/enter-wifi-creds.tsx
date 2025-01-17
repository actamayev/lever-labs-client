import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import EnterWifiPassword from "./enter-wifi-password"
import EnterWifiNetworkName from "./enter-wifi-network-name"
import EnterWifiInstructions from "./enter-wifi-instructions"
import { useAddPipContext } from "../../contexts/add-pip-context"

function EnterWifiCreds() {
	const addPipClass = useAddPipContext()

	if (
		isNull(addPipClass) ||
		addPipClass.store.addingNewPipRequirements.doesPipUUIDExist === false ||
		addPipClass.store.addingNewPipRequirements.isPipOnline ||
		!addPipClass.store.isPipNameValid
	) return null

	return (
		<>
			<EnterWifiInstructions />
			<EnterWifiNetworkName />
			<EnterWifiPassword />
		</>
	)
}

export default observer(EnterWifiCreds)
