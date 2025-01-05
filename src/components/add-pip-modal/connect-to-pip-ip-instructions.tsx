import _ from "lodash"
import { observer } from "mobx-react"
import { Button } from "../shadcn/ui/button"
import { useAddPipContext } from "../../contexts/add-pip-context"
import useOpenIpAddrTab from "../../hooks/pip/open-ip-addr-tab"

function ConnectToPipInstructions() {
	const addPipClass = useAddPipContext()
	const openIpAddrTab = useOpenIpAddrTab()

	if (
		_.isNull(addPipClass) ||
		_.isNull(addPipClass.store.encodedWifiCredentials) ||
		addPipClass.store.addingNewPipRequirements.doesPipUUIDExist === false
	) return null

	return (
		<div className="my-2">
			<div className="flex flex-col">
				<div>
					Step 4: Send your Wi-Fi credentials to {addPipClass.store.mirroredFormValues.pipName}
				</div>
				<div>
					1. Open your computer&apos;s Wi-Fi settings
				</div>
				<div>
					2. Connect to the Wi-Fi network:&nbsp;
					<span className="font-bold">
						pip-{addPipClass.store.mirroredFormValues.pipUUID}
					</span>
				</div>
				{addPipClass.store.newPipConnectionStatus !== "connected" && (
					<Button
						type="button"
						className="mt-2"
						onClick={openIpAddrTab}
					>
						Send Wi-Fi credentials
					</Button>
				)}
			</div>
		</div>
	)
}

export default observer(ConnectToPipInstructions)
