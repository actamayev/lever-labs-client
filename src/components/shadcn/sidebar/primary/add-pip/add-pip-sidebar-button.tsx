import { Bot } from "lucide-react"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { SidebarMenu, SidebarMenuItem } from "@/components/shadcn/ui/sidebar"
import { useLocation } from "react-router"
// import PipStatusTooltip from "./pip-status-tooltip"
import CustomSidebarButton from "../custom-sidebar-button"
import { usePipContext } from "../../../../../contexts/pip-context"
import useClickPipSidebarButton from "../../../../../hooks/pip/click-pip-sidebar-button"
import useSetSelectedPipToFirstPip from "../../../../../hooks/pip/set-default-pip-first-pip"

function AddPipSidebarButton() {
	const location = useLocation()
	const pipClass = usePipContext()
	const clickPipSidebarButton = useClickPipSidebarButton()
	useSetSelectedPipToFirstPip()

	const sidebarPipText = useCallback(() => {
		if (!pipClass.selectedPip) return "ADD PIP"
		if (pipClass.selectedPip.pipConnectionStatus === "connected") return "CONNECTED"
		return "CONNECT"
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pipClass.selectedPip, pipClass.selectedPip?.pipConnectionStatus])

	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex justify-start">
				<CustomSidebarButton
					icon={<Bot />}
					text={sidebarPipText()}
					isActive={location.pathname === "/add-pip"}
					onClick={clickPipSidebarButton}
					iconClassName="text-blue-600 dark:text-blue-300"
				/>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

export default observer(AddPipSidebarButton)
