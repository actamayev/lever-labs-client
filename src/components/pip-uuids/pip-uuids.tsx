import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useEffect, useRef, useState } from "react"
import PipName from "./pip-name"
import { cn } from "../../lib/shadcn/utils"
import { Button } from "../shadcn/ui/button"
import DropdownArrow from "./dropdown-arrow"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu"
import useUsername from "../../hooks/memos/username"
import { usePipContext } from "../../contexts/pip-context"
import AvailablePipsDropdown from "./available-pips-dropdown"
import { useAddPipContext } from "../../contexts/add-pip-context"
import useDisconnectFromPip from "../../hooks/pip/disconnect-from-pip"
import useRequestToConnectToPip from "../../hooks/pip/request-to-connect-to-pip"
import useClickOutsideUseEffect from "../../hooks/click-outside/click-outside-use-effect"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"

function PipUUIDs() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const pipClass = usePipContext()
	const addPipClass = useAddPipContext()
	const username = useUsername()
	const requestToConnectToPip = useRequestToConnectToPip()
	const diconnectFromPip = useDisconnectFromPip()
	useClickOutsideUseEffect(dropdownRef, setIsDropdownOpen)
	const navigate = useTypedNavigate()

	useEffect(() => {
		pipClass.setSelectedPipToFirstPip()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pipClass.pipData.length])

	const handlePipNameClick = useCallback(async (e: React.MouseEvent) => {
		e.stopPropagation()
		if (!_.isNull(pipClass.selectedPip)) {
			if (pipClass.selectedPip.pipConnectionStatus === "connected") {
				return await diconnectFromPip(pipClass.selectedPip)
			} else {
				return await requestToConnectToPip(pipClass.selectedPip.pipUUID)
			}
		}
		if (_.isEmpty(pipClass.pipData) && !_.isNull(addPipClass)) {
			navigate("/add-pip")
		}
	}, [addPipClass, diconnectFromPip, navigate, pipClass.pipData, pipClass.selectedPip, requestToConnectToPip])

	if (_.isNull(username)) return null

	return (
		<div className="relative" ref={dropdownRef}>
			<DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
				<div className="flex w-56 h-10 items-stretch justify-between max-w-56
				bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white rounded-lg">
					<Button
						variant="ghost"
						onClick={handlePipNameClick}
						className={cn(
							"h-full flex flex-grow items-center justify-between px-3 ",
							"hover:bg-zinc-200 dark:hover:bg-zinc-700",
							"rounded-none",
							_.isEmpty(pipClass.pipData) ? "rounded-lg" : "rounded-l-lg"
						)}
					>
						<PipName />
					</Button>

					<DropdownMenuTrigger asChild>
						<div className="h-full">
							<DropdownArrow
								isDropdownOpen={isDropdownOpen}
								setIsDropdownOpen={setIsDropdownOpen}
							/>
						</div>
					</DropdownMenuTrigger>
				</div>

				<DropdownMenuContent
					align="end"
					className="w-52"
					sideOffset={8}
				>
					<AvailablePipsDropdown />
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

export default observer(PipUUIDs)
