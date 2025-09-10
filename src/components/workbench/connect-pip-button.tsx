"use client"

import { observer } from "mobx-react"
import { TactileButton } from "../shadcn/ui/tactile-button"
import { CustomRemote } from "../icons/custom-remote"
import ConnectToPipDialog from "./connect-pip-dialog"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import pipClass from "../../classes/pip-class"

function ConnectToPipButton(): React.ReactNode {
	const colors = getDuolingoColors("humpback")

	return (
		<>
			<TactileButton
				onClick={(): void => pipClass.setIsConnectPipDialogOpen(true)}
				className={`h-8 w-8 p-0 rounded-lg text-white ${colors.bg}`}
				shadowHeight={4}
				shadowClass={colors.shadow2}
				title="Connect to Pip"
			>
				<CustomRemote className="h-4 w-4" />
			</TactileButton>

			<ConnectToPipDialog />
		</>
	)
}

export default observer(ConnectToPipButton)
