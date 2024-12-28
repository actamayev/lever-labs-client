import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import EnterPipID from "./enter-pip-id"
import { Form } from "../../shadcn/ui/form"
import EnterPipName from "./enter-pip-name"
import AddPipButton from "./add-pip-button"
import EnterWifiCreds from "./enter-wifi-creds"
import useAddPip from "../../../hooks/pip/add-pip"
import SelectAutoreconnectToPip from "./select-autoconnect-to-pip"
import { useAddPipContext } from "../../../contexts/add-pip-context"
import ConnectToPipInstructions from "./connect-to-pip-ip-instructions"

function AddPipForm({ toggleModalOpen } : { toggleModalOpen: () => void }) {
	const addPip = useAddPip()
	const [encodedWifiCredentials, setEncodedWifiCredentials] = useState<string | null>(null)
	const addPipClass = useAddPipContext()

	const onSubmit = useCallback(async () => {
		await addPip(toggleModalOpen)
	}, [addPip, toggleModalOpen])

	if (_.isNull(addPipClass)) return null

	return (
		<div className="p-3">
			<Form {...addPipClass.form}>
				<form onSubmit={addPipClass.form.handleSubmit(onSubmit)} className="mb-3">
					<div className="flex flex-col">
						<p className="mb-1">Step 1: Turn on your Pip</p>
						<p className="mb-1">Step 2: Add your Pip&apos;s ID and give it a name</p>
						<div className="flex flex-row gap-4">
							<div className="w-1/3">
								<EnterPipID />
							</div>
							<div className="flex-1">
								<EnterPipName />
							</div>
						</div>
						<EnterWifiCreds setEncodedWifiCredentials={setEncodedWifiCredentials} />
						<ConnectToPipInstructions encodedWifiCredentials={encodedWifiCredentials} />
						<SelectAutoreconnectToPip />
						{/* <AddPipButton /> */}
					</div>
				</form>
			</Form>
		</div>
	)
}

export default observer(AddPipForm)
