import { observer } from "mobx-react"
import NetworkWorkbench from "../../../workbench/network/network-workbench"

function SandboxNetworkSection(): React.ReactNode {
	return (
		<div className="flex items-center font-medium">
			<NetworkWorkbench isSandboxPage={true} />
		</div>
	)
}

export default observer(SandboxNetworkSection)
