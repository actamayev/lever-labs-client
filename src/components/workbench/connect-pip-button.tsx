"use client"

import { observer } from "mobx-react"
import { TactileButton } from "../shadcn/ui/tactile-button"
import ConnectToPipDialog from "./connect-pip-dialog"
import { DuolingoColorVariants } from "../../utils/get-duolingo-colors"
import pipClass from "../../classes/pip-class"
import { WifiHighIcon } from "lucide-react"
import { WORKBENCH_ROUNDING_RADIUS } from "../../utils/constants/constants"
import { cn } from "../../lib/shadcn/utils"

interface ConnectToPipButtonProps {
	colors: DuolingoColorVariants
	tactileButtonClasses: string
	wifiIconClasses: string
}

function ConnectToPipButton({ colors, tactileButtonClasses, wifiIconClasses }: ConnectToPipButtonProps): React.ReactNode {
	return (
		<>
			<TactileButton
				onClick={(): void => pipClass.setIsConnectPipDialogOpen(true)}
				className={cn("w-full h-full text-white font-semibold", colors.bg, tactileButtonClasses)}
				shadowHeight={4}
				shadowClass={colors.shadow2}
				title="Connect to Pip"
				style={{
					borderRadius: WORKBENCH_ROUNDING_RADIUS,
				}}
			>
				<div className="flex items-center justify-center gap-2">
					<WifiHighIcon className={cn(wifiIconClasses)} />
					<span className="leading-none">Connect to Pip</span>
				</div>
			</TactileButton>

			<ConnectToPipDialog />
		</>
	)
}

export default observer(ConnectToPipButton)
