"use client"
import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import { cn } from "../../lib/shadcn/utils"
import VolumeIcon from "./volume/volume-icon"
import BatteryIcon from "./battery/battery-icon"
import NetworkIcon from "./network/network-icon"
import { WORKBENCH_ROUNDING_RADIUS } from "../../utils/constants"
import { useWorkbenchContext } from "../../contexts/workbench-context"

function WorkbenchTopSection({ topSectionHeight }: { topSectionHeight: number }) {
	const workbenchClass = useWorkbenchContext()
	const pathname = usePathname()

	// Check if we're on the garage page
	const isGaragePage = pathname === "/garage" || pathname.startsWith("/garage/")

	return (
		<div
			className={cn("fixed border-b border-l-2", isGaragePage ? "border-l" : "border-l-2")}
			style={{
				width: workbenchClass.fixedWidth + "px",
				top: "0",
				height: `${topSectionHeight}px`,
				maxHeight: `${topSectionHeight}px`,
				overflowY: "auto",
				borderBottomLeftRadius: WORKBENCH_ROUNDING_RADIUS,
			}}
		>
			<div
				className="relative p-3 z-50"
				onMouseLeave={() => {
					// Only close the card if we're not hovering over it
					if (!workbenchClass.hoveringOverWorkbenchCard) {
						workbenchClass.setWorkbenchItemToShow(null)
					}
				}}
			>
				<div className="flex flex-row justify-between">
					<BatteryIcon />
					<VolumeIcon />
					<NetworkIcon />
				</div>
			</div>
		</div>
	)
}

export default observer(WorkbenchTopSection)
