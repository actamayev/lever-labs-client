"use client"

import { observer } from "mobx-react"
import { TactileButton } from "../shadcn/ui/tactile-button"
import ConnectToPipDialog from "./connect-pip-dialog"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import pipClass from "../../classes/pip-class"
import { WifiHighIcon } from "lucide-react"

function ConnectToPipButton(): React.ReactNode {
	const colors = getDuolingoColors("humpback")

	return (
		<>
			<TactileButton
				onClick={(): void => pipClass.setIsConnectPipDialogOpen(true)}
				className={`w-full h-12 rounded-xl text-white text-lg font-semibold ${colors.bg}`}
				shadowHeight={4}
				shadowClass={colors.shadow2}
				title="Connect to Pip"
			>
				<div className="flex items-center justify-center gap-2">
					<WifiHighIcon className="!size-7 mb-2" />
					<span className="leading-none">Connect to Pip</span>
				</div>
			</TactileButton>

			<ConnectToPipDialog />
		</>
	)
}

export default observer(ConnectToPipButton)
