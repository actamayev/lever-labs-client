"use client"
import { observer } from "mobx-react"
import { useEffect, useRef, useState } from "react"
import WorkbenchCard from "./workbench-card"
import VolumeIcon from "./volume/volume-icon"
import BatteryIcon from "./battery/battery-icon"
import NetworkIcon from "./network/network-icon"
import { useWorkbenchContext } from "../../contexts/workbench-context"

// TODO: Center the icons horizontally, but have them fixed vertically.
// TODO: Confirm consistent styling on career quest, garage.
function Workbench() {
	const workbenchClass = useWorkbenchContext()
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [fixedWidth, setFixedWidth] = useState(0)

	useEffect(() => {
		const updateWidth = () => {
			if (containerRef.current) {
				setFixedWidth(containerRef.current.offsetWidth)
			}
		}

		updateWidth()
		window.addEventListener("resize", updateWidth)
		return () => window.removeEventListener("resize", updateWidth)
	}, [])

	return (
		<div className="hidden lg:block lg:w-2/5 xl:w-1/4" ref={containerRef}>
			{/* This is the fixed element */}
			<div className="fixed top-11" style={{ width: fixedWidth + "px" }}>
				<div
					className="relative"
					onMouseLeave={() => {
						// Only close the card if we're not hovering over it
						if (!workbenchClass.hoveringOverWorkbenchCard) {
							workbenchClass.setWorkbenchItemToShow(null)
						}
					}}
				>
					<div className="flex flex-row space-x-5">
						<BatteryIcon />
						<VolumeIcon />
						<NetworkIcon />
					</div>
					<div className="-mt-0.5">
						<WorkbenchCard />
					</div>
				</div>
			</div>
		</div>
	)
}

export default observer(Workbench)
