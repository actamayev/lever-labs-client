"use client"

import { observer } from "mobx-react"
import { BotIcon } from "lucide-react"
import { TactileButton } from "../buttons/tactile-button"
import ConnectToPipDialog from "./connect-pip-dialog"
import { DuolingoColorVariants } from "../../utils/get-duolingo-colors"
import pipClass from "../../classes/pip-class"
import { cn } from "../../lib/shadcn/utils"
import { WORKBENCH_ROUNDING_RADIUS } from "../../utils/constants/constants"
import searchPipByUUIDUtil from "../../utils/pip/search-pip-by-uuid-util"

interface ConnectToPipButtonProps {
	colors: DuolingoColorVariants
	tactileButtonClasses: string
	botIconClasses: string
}

function ConnectToPipButton(props: ConnectToPipButtonProps): React.ReactNode {
	const { colors, tactileButtonClasses, botIconClasses } = props

	const handleClick = async (): Promise<void> => {
		pipClass.setIsConnectPipDialogOpen(true)

		// If there's already a valid 5-character pipUUID, trigger the search
		if (pipClass.pipUUIDSearchTerm && pipClass.pipUUIDSearchTerm.length === 5) {
			await searchPipByUUIDUtil(pipClass.pipUUIDSearchTerm)
		}
	}

	return (
		<>
			<TactileButton
				onClick={handleClick}
				className={cn("w-full h-full text-white font-semibold", colors.bg, tactileButtonClasses)}
				shadowHeight={4}
				shadowClass={colors.shadow2}
				title="Connect to Pip"
				style={{
					borderRadius: WORKBENCH_ROUNDING_RADIUS,
				}}
			>
				<div className="flex items-center justify-center gap-2">
					<BotIcon className={cn(botIconClasses)} />
					<span className="leading-none">Connect to Pip</span>
				</div>
			</TactileButton>

			<ConnectToPipDialog />
		</>
	)
}

export default observer(ConnectToPipButton)
