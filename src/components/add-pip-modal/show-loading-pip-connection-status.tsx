import _ from "lodash"
import { observer } from "mobx-react"
import LoadingMessage from "../messages/loading-message"
import SuccessMessage from "../messages/success-message"
import { useAddPipContext } from "../../contexts/add-pip-context"

function ShowLoadingPipConnectionStatus() {
	const addPipClass = useAddPipContext()

	if (
		_.isNull(addPipClass) ||
		_.isNull(addPipClass.store.hasPipConnectedToInternet)
	) return null

	if (addPipClass.store.hasPipConnectedToInternet === false) {
		return (
			<div className="my-2">
				<LoadingMessage message="Connecting to Pip..." />
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
