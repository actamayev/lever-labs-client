import { observer } from "mobx-react"
import NetworkIconToShow from "../../../workbench/network/network-icon-to-show"

function SandboxNetworkSection(): React.ReactNode {
	return (
		<div className="flex items-center font-medium">
			<NetworkIconToShow />
		</div>
	)
}

export default observer(SandboxNetworkSection)
