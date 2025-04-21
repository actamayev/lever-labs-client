"use client"
import { observer } from "mobx-react"
import { useEffect, useRef, useState } from "react"
import WorkbenchCard from "./workbench-card"
import VolumeIcon from "./volume/volume-icon"
import BatteryIcon from "./battery/battery-icon"
import NetworkIcon from "./network/network-icon"
import { useWorkbenchContext } from "../../contexts/workbench-context"
import DrivingControls from "../garage/driving-and-sounds/driving/driving-controls"
import { usePathname } from "next/navigation"

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

	return (
		<div className="w-[37.5%] z-20" ref={containerRef}>
			{/* Top section with icons and workbench card */}
			<div className="fixed top-11 rounded-xl" style={{ width: fixedWidth + "px" }}>
				<div
					className="relative"
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

			{/* Bottom section with driving controls - only show on garage page */}
			{isGaragePage && (
				<div>
					<div className="border-t border-l border-b rounded-bl-3xl rounded-tl-3xl">
						<div className="flex items-center justify-center h-full">
							Test
						</div>
					</div>
					<div
						className="fixed rounded-tl-3xl border-l border-t"
						style={{
							width: fixedWidth + "px",
							bottom: "0rem",
							height: `${windowHeight / 3}px`,
							maxHeight: `${windowHeight / 3}px`,
							overflowY: "auto"
						}}
					>
						<div className="flex items-center justify-center h-full">
							<DrivingControls />
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default observer(Workbench)
