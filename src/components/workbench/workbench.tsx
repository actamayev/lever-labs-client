"use client"
import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import WorkbenchCard from "./workbench-card"
import { cn } from "../../lib/shadcn/utils"
import VolumeIcon from "./volume/volume-icon"
import BatteryIcon from "./battery/battery-icon"
import NetworkIcon from "./network/network-icon"
import { WORKBENCH_ROUNDING_RADIUS } from "../../utils/constants"
import { useWorkbenchContext } from "../../contexts/workbench-context"
import DrivingControls from "../garage/driving-and-sounds/driving/driving-controls"

// eslint-disable-next-line max-lines-per-function
function Workbench() {
	const workbenchClass = useWorkbenchContext()
	const containerRef = useRef<HTMLDivElement | null>(null)
	const pathname = usePathname()

	// Check if we're on the garage page
	const isGaragePage = pathname === "/garage" || pathname.startsWith("/garage/")

	useEffect(() => {
		const updateDimensions = () => {
			if (containerRef.current) {
				workbenchClass.setFixedWidth((containerRef.current.offsetWidth))
			}
			// console.log(workbenchClass.fixedWidth)
			workbenchClass.setWindowHeight(window.innerHeight)
		}

		updateDimensions()
		window.addEventListener("resize", updateDimensions)
		return () => window.removeEventListener("resize", updateDimensions)
	}, [workbenchClass])

	// Calculate section heights
	const topSectionHeight = workbenchClass.windowHeight / 5  // 1/4 of screen height
	const bottomSectionHeight = workbenchClass.windowHeight / 3  // 1/3 of screen height
	const middleSectionHeight = workbenchClass.windowHeight - topSectionHeight - (isGaragePage ? bottomSectionHeight : 0)

	// Calculate positions
	const middleSectionTop = topSectionHeight
	const bottomSectionTop = topSectionHeight + middleSectionHeight

	return (
		<div className="w-[37.5%] z-20" ref={containerRef}>
			{/* Top section with icons and workbench card - 1/4 height */}
			<div
				className={cn("fixed border-b", isGaragePage ? "border-l" : "border-l-2")}
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
			<div
				className={cn("fixed border-t border-b", isGaragePage ? "border-l" : "border-l-2")}
				style={{
					width: workbenchClass.fixedWidth + "px",
					top: `${middleSectionTop}px`,
					height: `${middleSectionHeight}px`,
					maxHeight: `${middleSectionHeight}px`,
					overflowY: "auto",
					borderTopLeftRadius: WORKBENCH_ROUNDING_RADIUS,
					borderBottomLeftRadius: WORKBENCH_ROUNDING_RADIUS,
				}}
			>
				<div className="flex items-center justify-center h-full">
					{/* Middle section content goes here */}
					<div className="text-center p-4">
						<h3 className="text-xl text-eel">Workbench Middle Section</h3>
					</div>
				</div>
			</div>

			{/* Bottom section with driving controls - only show on garage page - 1/3 height */}
			{isGaragePage && (
				<div
					className="fixed border-l border-t"
					style={{
						width: workbenchClass.fixedWidth + "px",
						top: `${bottomSectionTop}px`,
						height: `${bottomSectionHeight}px`,
						maxHeight: `${bottomSectionHeight}px`,
						overflowY: "auto",
						borderTopLeftRadius: WORKBENCH_ROUNDING_RADIUS,
					}}
				>
					<div className="flex flex-col items-center justify-center h-full">
						<DrivingControls />
					</div>
				</div>
			)}
			<WorkbenchCard />
		</div>
	)
}

export default observer(Workbench)
