import _ from "lodash"
import { observer } from "mobx-react"
import ErrorMessage from "../messages/error-message"
import LoadingMessage from "../messages/loading-message"
import SuccessMessage from "../messages/success-message"
import { useAddPipContext } from "../../contexts/add-pip-context"

function ShowLoadingPipConnectionStatus() {
	const addPipClass = useAddPipContext()

	if (_.isNull(addPipClass)) return null

	if (addPipClass.store.isUserReadyToConnectToPipDialog === false) {
		return (
			<div className="my-2">
				<ErrorMessage
					error={
						`Please connect to Pip's Wi-Fi (pip-${addPipClass.store.mirroredFormValues.pipUUID}).
						You are not currently connected`
					}
				/>
			</div>
		)
	}

	if (_.isNull(addPipClass.store.newPipConnectionStatus)) return null

	if (addPipClass.store.newPipConnectionStatus === "connecting") {
		return (
			<div className="my-2">
				<LoadingMessage message="Connecting to Pip..." />
			</div>
		)
	}

	else if (addPipClass.store.newPipConnectionStatus === "failed") {
		return (
			<div className="my-2">
				<ErrorMessage error="Unable to connect to Pip. Please make sure the Wi-Fi password is correct" />
			</div>
		)
	}

	return (
		<div className="my-2">
			<SuccessMessage message="Connected!" />
		</div>
	)
}

export default observer(ShowLoadingPipConnectionStatus)
