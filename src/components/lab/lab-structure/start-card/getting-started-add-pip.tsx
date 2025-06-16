"use client"

import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { useCallback } from "react"
import { Bot, PlusCircle } from "lucide-react"
import { Button } from "@/components/shadcn/ui/button"
import CustomTooltip from "../../../custom-tooltip"
import PipButtonTooltip from "../../../pip-button-tooltip"
import pipClass from "../../../../classes/pip-class"
import useTypedNavigate from "../../../../hooks/navigate/typed-navigate"
import PipStatusTooltip from "../../../shadcn/sidebar/add-pip/pip-status-tooltip"
import useSetSelectedPipFirstPipUseEffect from "../../../../hooks/pip/set-selected-pip-first-pip-use-effect"

// Simplified PipStatus component specifically for the card
function GettingStartedAddPip() {
	const navigate = useTypedNavigate()
	useSetSelectedPipFirstPipUseEffect()

	const onClick = useCallback(() => {
		if (!isNull(pipClass.selectedPip)) return
		navigate("/add-pip")
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigate, pipClass.selectedPip])

	return (
		<CustomTooltip
			tooltipTrigger={
				<Button
					onClick={onClick}
					className="!flex !h-24 !w-24 !min-w-24 relative items-center justify-center
                        bg-inherit hover:bg-polar
                        duration-none border-swan border-l-2 rounded-none rounded-tr-md rounded-br-md shadow-none"
				>
					<div className="relative">
						<Bot className="!h-12 !w-12 !min-w-12 text-blue-600 dark:text-blue-300" />
						{pipClass.selectedPip ? (
							<div className="absolute" style={{ top: "-6px", right: "-6px" }}>
								<PipStatusTooltip />
							</div>
						) : (
							<div className="absolute" style={{ bottom: "35px", right: "-5px" }}>
								<PlusCircle className="!h-5 !w-5 text-eel rounded-full"/>
							</div>
						)}
					</div>
				</Button>
			}
			tooltipContent={<PipButtonTooltip />}
		/>
	)
}

export default observer(GettingStartedAddPip)
