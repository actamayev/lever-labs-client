import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useEffect, useRef, useState } from "react"
import PipName from "./pip-name"
import AddPipModal from "./add-pip-modal"
import DropdownArrow from "./dropdown-arrow"
import useUsername from "../../hooks/memos/username"
import AvailablePipsDropdown from "./available-pips-dropdown"
import { usePipContext } from "../../contexts/pip-context"
import useDisconnectFromPip from "../../hooks/pip/disconnect-from-pip"
import useRequestToConnectToPip from "../../hooks/pip/request-to-connect-to-pip"
import useClickOutsideUseEffect from "../../hooks/click-outside/click-outside-use-effect"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu"
import { Button } from "../shadcn/ui/button"
import { cn } from "../../lib/shadcn/utils"

function PipUUIDs() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const pipClass = usePipContext()
	const username = useUsername()
	const requestToConnectToPip = useRequestToConnectToPip()
	const diconnectFromPip = useDisconnectFromPip()
	useClickOutsideUseEffect(dropdownRef, setIsDropdownOpen)

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
				return await requestToConnectToPip(pipClass.selectedPip)
			}
		}
		if (_.isEmpty(pipClass.pipData)) {
			setIsModalOpen(true)
		}
	}, [diconnectFromPip, pipClass.pipData, pipClass.selectedPip, requestToConnectToPip])

	if (_.isNull(username)) return null

	return (
		<div className="relative mr-2" ref={dropdownRef}>
			<DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
				<div className="flex w-52 h-7 items-stretch justify-between
				bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white rounded-lg">
					<Button
						variant="ghost"
						onClick={handlePipNameClick}
						className={cn(
							"flex-grow h-full px-3 justify-start",
							"hover:bg-zinc-300 dark:hover:bg-zinc-600",
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
					<AvailablePipsDropdown setIsModalOpen={setIsModalOpen} />
				</DropdownMenuContent>
			</DropdownMenu>

			{isModalOpen && <AddPipModal toggleModalOpen={() => setIsModalOpen(false)} />}
		</div>
	)
}

export default observer(PipUUIDs)
