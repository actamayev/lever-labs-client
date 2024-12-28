import _ from "lodash"
import { observer } from "mobx-react"
import EnterWifiPassword from "./enter-wifi-password"
import EnterWifiNetworkName from "./enter-wifi-network-name"
import { useAddPipContext } from "../../contexts/add-pip-context"

function EnterWifiCreds() {
	const addPipClass = useAddPipContext()

	if (
		_.isNull(addPipClass) ||
		addPipClass.store.addingNewPipRequirements.doesPipUUIDExist === false ||
		addPipClass.store.addingNewPipRequirements.isPipOnline
	) return null

	return (
		<>
			<p className="my-1">Step 3: Connect {addPipClass.store.mirroredFormValues.pipName} to Wi-Fi</p>
			<EnterWifiNetworkName />
			<EnterWifiPassword />
		</>
	)
}

export default observer(EnterWifiCreds)
