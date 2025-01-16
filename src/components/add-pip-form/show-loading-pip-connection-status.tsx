import _ from "lodash"
import { observer } from "mobx-react"
import ErrorMessage from "../messages/error-message"
import LoadingMessage from "../messages/loading-message"
import SuccessMessage from "../messages/success-message"
import { useAddPipContext } from "../../contexts/add-pip-context"

function ShowLoadingPipConnectionStatus() {
	const addPipClass = useAddPipContext()

	if (_.isNull(addPipClass)) return null

	if (
		!addPipClass.store.addingNewPipRequirements.doesPipUUIDExist ||
		!addPipClass.store.isPipNameValid ||
		!addPipClass.store.addingNewPipRequirements.checkedConnectedToWifi
	) return null
	if (addPipClass.store.isUserReadyToConnectToPipDialog === false) {
		return (
			<div className="mt-6">
				<ErrorMessage
					error={`Please connect to Pip's Wi-Fi (pip-${addPipClass.store.mirroredFormValues.pipUUID})`}
				/>
			</div>
		)
	}

	if (_.isNull(addPipClass.store.newPipConnectionStatus)) return null

	if (addPipClass.store.newPipConnectionStatus === "connecting") {
		return (
			<div className="my-6">
				<LoadingMessage message="Connecting to Pip..." />
			</div>
		)
	}

	else if (addPipClass.store.newPipConnectionStatus === "failed") {
		return (
			<div className="my-6">
				<ErrorMessage
					error={`We couldn't connect ${addPipClass.store.mirroredFormValues.pipName} to Wi-Fi. 
					Please check if your Wi-Fi name and password are entered correctly.`}
				/>
			</div>
		)
	}

	return (
		<div className="my-6">
			<SuccessMessage
				message={`Success! ${addPipClass.store.mirroredFormValues.pipName} is all set up and ready to go.`}
			/>
		</div>
	)
}

export default observer(ShowLoadingPipConnectionStatus)
