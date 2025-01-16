import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useEffect } from "react"
import { Bot, PlusCircle } from "lucide-react"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/shadcn/ui/sidebar"
import PipStatusTooltip from "./pip-status-tooltip"
import { usePipContext } from "../../../../../contexts/pip-context"
import useTypedNavigate from "../../../../../hooks/navigate/typed-navigate"
import useDisconnectFromPip from "../../../../../hooks/pip/disconnect-from-pip"
import useRequestToConnectToPip from "../../../../../hooks/pip/request-to-connect-to-pip"

function AddPipSidebarButton() {
	const navigate = useTypedNavigate()
	const pipClass = usePipContext()
	const diconnectFromPip = useDisconnectFromPip()
	const requestToConnectToPip = useRequestToConnectToPip()

	useEffect(() => {
		pipClass.setSelectedPipToFirstPip()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pipClass.pipData.length])

	const handleButtonClick = useCallback(async () => {
		if (!_.isNull(pipClass.selectedPip)) {
			if (pipClass.selectedPip.pipConnectionStatus === "connected") {
				return await diconnectFromPip(pipClass.selectedPip)
			} else {
				return await requestToConnectToPip(pipClass.selectedPip.pipUUID)
			}
		}
		if (_.isEmpty(pipClass.pipData)) {
			navigate("/add-pip")
		}
	}, [diconnectFromPip, navigate, pipClass.pipData, pipClass.selectedPip, requestToConnectToPip])

	const tooltipContent = () => {
		if (_.isNull(pipClass.selectedPip)) {
			return <>Add Pip</>
		} else if (pipClass.selectedPip.pipConnectionStatus === "connected") {
			return <>Disconnect from {pipClass.selectedPip.pipName}</>
		}
		return <>Connect to {pipClass.selectedPip.pipName}</>
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex justify-center">
				<SidebarMenuButton
					tooltip={{
						children: tooltipContent(),
						hidden: false
					}}
					onClick={handleButtonClick}
					className="!flex !h-[54px] !w-[54px] !min-w-[54px] relative items-center justify-center
					group-data-[collapsible=icon]:!h-[54px] group-data-[collapsible=icon]:!w-[54px]
					data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground !p-0"
					isActive={location.pathname === "/add-pip"}
				>
					<Bot className="!h-[35px] !w-[35px] !min-w-[35px]" />
					{pipClass.selectedPip ? (
						<PipStatusTooltip pipData={pipClass.selectedPip} />
					) : (
						<PlusCircle
							className="absolute !h-[20px] !w-[20px] bg-background rounded-full"
							style={{ right: "1px", top: "1px" }}
						/>
					)}
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

export default observer(AddPipSidebarButton)
