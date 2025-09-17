"use client"
import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import { cn } from "../../lib/shadcn/utils"
import BatteryWorkbench from "./battery/battery-workbench"
import NetworkWorkbench from "./network/network-workbench"
import SoundWorkbench from "./sound/sound-workbench"
import ConnectToPipButton from "../connect-pip/connect-to-pip-button"
import workbenchClass from "../../classes/workbench-class"
import pipClass from "../../classes/pip-class"
import { WORKBENCH_ROUNDING_RADIUS } from "../../utils/constants/constants"
import getDuolingoColors from "../../utils/get-duolingo-colors"

function WorkbenchTopSection({ topSectionHeight }: { topSectionHeight: number }): React.ReactNode {
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
			{(!pipClass.selectedPip && !pipClass.pipPluggedInSerial) ? (
				<div className="h-full w-full flex items-center justify-center p-5">
					<ConnectToPipButton
						colors={getDuolingoColors("humpback")}
						tactileButtonClasses="text-4xl"
						botIconClasses="!size-12"
					/>
				</div>
			) : (
				<div className="relative px-10 z-50 h-full">
					<div className="flex flex-row justify-between items-center h-full">
						<BatteryWorkbench />
						<NetworkWorkbench />
						<SoundWorkbench />
					</div>
				</div>
			)}
		</div>
	)
}

export default observer(WorkbenchTopSection)
