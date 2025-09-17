import { observer } from "mobx-react"
import NetworkIconToShow from "../../workbench/network/network-icon-to-show"

function CQNetworkSection(): React.ReactNode {
	return (
		<div className="flex items-center justify-center font-medium">
			<NetworkIconToShow iconClasses="!size-9" colorClasses="text-wolf" />
		</div>
	)
}

export default observer(CQNetworkSection)
