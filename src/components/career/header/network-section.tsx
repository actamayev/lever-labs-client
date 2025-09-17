import { observer } from "mobx-react"
import NetworkIconToShow from "../../workbench/network/network-icon-to-show"

function NetworkSection(): React.ReactNode {

	return (
		<div className="flex flex-col items-center justify-center font-medium border-2 border-swan rounded-2xl p-1">
			<NetworkIconToShow />
		</div>
	)
}

export default observer(NetworkSection)
