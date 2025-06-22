"use client"
import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import { cn } from "../../lib/shadcn/utils"
import VolumeIcon from "./volume-icon"
import BatteryIcon from "./battery-icon"
import NetworkIcon from "./network-icon"
import workbenchClass from "../../classes/workbench-class"
import { WORKBENCH_ROUNDING_RADIUS } from "../../utils/constants/constants"

function WorkbenchTopSection({ topSectionHeight }: { topSectionHeight: number }) {
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
			<div className="relative p-3 z-50">
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
