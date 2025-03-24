"use client"

import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { Button } from "../shadcn/ui/button"
import { Checkbox } from "../shadcn/ui/checkbox"
import { useAddPipContext } from "../../contexts/add-pip-context"
import useOpenIpAddrTab from "../../hooks/pip/open-ip-addr-tab"

function ConnectToPipInstructions() {
	const addPipClass = useAddPipContext()
	const openIpAddrTab = useOpenIpAddrTab()

	if (
		isNull(addPipClass) ||
		isNull(addPipClass.store.encodedWifiCredentials) ||
		addPipClass.store.addingNewPipRequirements.doesPipUUIDExist === false ||
		!addPipClass.store.isPipNameValid
	) return null

	return (
		<div className="mt-6">
			<div className="flex flex-col">
				<div className="font-bold mb-2">Step 4</div>
				<div>1. Open your computer's Wi-Fi settings</div>
				<div>
					<div className="flex items-center space-x-2">
						<div>
							2. Connect to the Wi-Fi network:&nbsp;
							<span className="font-bold">
								pip-{addPipClass.store.mirroredFormValues.pipUUID}
							</span>
						</div>
						<Checkbox
							id="wifi-connected"
							checked={addPipClass.store.addingNewPipRequirements.checkedConnectedToWifi}
							onCheckedChange={() =>
								addPipClass.store.updateAddingNewPipRequirements(
									"checkedConnectedToWifi",
									!addPipClass.store.addingNewPipRequirements.checkedConnectedToWifi
								)
							}
							className="size-8 group relative hover:bg-black dark:hover:bg-white hover:text-primary duration-0"
							checkSize="size-7"
							showPlaceholder={true}
						/>
					</div>
				</div>
				{
					addPipClass.store.newPipConnectionStatus !== "connected" &&
					addPipClass.store.addingNewPipRequirements.checkedConnectedToWifi === true && (
						<Button
							type="button"
							className="mt-6 text-2xl h-12"
							onClick={openIpAddrTab}
							disabled={addPipClass.store.newPipConnectionStatus === "connecting"}
						>
							Send Wi-Fi credentials
						</Button>
					)}
			</div>
		</div>
	)
}

export default observer(ConnectToPipInstructions)
