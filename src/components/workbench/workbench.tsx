"use client"
import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import WorkbenchCard from "./workbench-card"
import VolumeIcon from "./volume/volume-icon"
import BatteryIcon from "./battery/battery-icon"
import NetworkIcon from "./network/network-icon"
import { useWorkbenchContext } from "../../contexts/workbench-context"
import DrivingControls from "../garage/driving-and-sounds/driving/driving-controls"
import { WORKBENCH_ROUNDING_RADIUS } from "../../utils/constants"

// eslint-disable-next-line max-lines-per-function
function Workbench() {
	const workbenchClass = useWorkbenchContext()
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [fixedWidth, setFixedWidth] = useState(0)
	const [windowHeight, setWindowHeight] = useState(0)
	const pathname = usePathname()

	// Check if we're on the garage page
	const isGaragePage = pathname === "/garage" || pathname.startsWith("/garage/")

	useEffect(() => {
		const updateDimensions = () => {
			if (containerRef.current) {
				setFixedWidth((containerRef.current.offsetWidth))
			}
			setWindowHeight(window.innerHeight)
		}

		updateDimensions()
		window.addEventListener("resize", updateDimensions)
		return () => window.removeEventListener("resize", updateDimensions)
	}, [])

	// Calculate section heights
	const topSectionHeight = windowHeight * 0.25  // 1/4 of screen height
	const bottomSectionHeight = windowHeight * 0.33  // 1/3 of screen height
	const middleSectionHeight = windowHeight - topSectionHeight - (isGaragePage ? bottomSectionHeight : 0)

	// Calculate positions
	const middleSectionTop = topSectionHeight
	const bottomSectionTop = topSectionHeight + middleSectionHeight

	return (
		<div className="w-[37.5%] z-20" ref={containerRef}>
			{/* Top section with icons and workbench card - 1/4 height */}
			<div
				className="fixed border-l border-b"
				style={{
					width: fixedWidth + "px",
					top: "0",
					height: `${topSectionHeight}px`,
					maxHeight: `${topSectionHeight}px`,
					overflowY: "auto",
					borderBottomLeftRadius: WORKBENCH_ROUNDING_RADIUS,
				}}
			>
				<div
					className="relative p-3"
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
					<div className="-mt-0.5">
						<WorkbenchCard />
					</div>
				</div>
			</div>

			{/* Middle section - remaining space */}
			<div
				className="fixed border-t border-l border-b"
				style={{
					width: fixedWidth + "px",
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
						<h3 className="text-xl text-gray-500">Workbench Middle Section</h3>
					</div>
				</div>
			</div>

			{/* Bottom section with driving controls - only show on garage page - 1/3 height */}
			{isGaragePage && (
				<div
					className="fixed border-l border-t p-5"
					style={{
						width: fixedWidth + "px",
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
		</div>
	)
}

export default observer(Workbench)
