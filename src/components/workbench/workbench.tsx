"use client"
import { observer } from "mobx-react"
import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { cn } from "../../lib/utils"
import WorkbenchTopSection from "./workbench-top-section"
import workbenchClass from "../../classes/workbench-class"
import DrivingControls from "../garage/driving/driving-controls"
import { WORKBENCH_ROUNDING_RADIUS } from "../../utils/constants/constants"

function Workbench(): React.ReactNode {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const pathname = usePathname()

	// Check if we're on the garage page
	const isGaragePage = pathname === "/garage" || pathname.startsWith("/garage/")

	useEffect((): () => void => {
		const updateDimensions = (): void => {
			if (containerRef.current) {
				workbenchClass.setFixedWidth((containerRef.current.offsetWidth))
			}
			workbenchClass.setWindowHeight(window.innerHeight)
		}

		updateDimensions()
		window.addEventListener("resize", updateDimensions)
		return (): void => window.removeEventListener("resize", updateDimensions)
	}, [])

	// Calculate section heights
	const topSectionHeight = workbenchClass.windowHeight / 5  // 1/4 of screen height
	const bottomSectionHeight = workbenchClass.windowHeight / 3  // 1/3 of screen height
	const middleSectionHeight = workbenchClass.windowHeight - topSectionHeight - (isGaragePage ? bottomSectionHeight : 0)

	// Calculate positions
	const middleSectionTop = topSectionHeight
	const bottomSectionTop = topSectionHeight + middleSectionHeight

	return (
		<div className="w-[37.5%] relative" ref={containerRef}>
			{/* Top section with icons and hover cards - highest z-index */}
			<div className="relative z-50">
				<WorkbenchTopSection topSectionHeight={topSectionHeight}/>
			</div>

			{/* Middle section - much lower z-index so hover cards appear above */}
			<div
				className={cn(
					"fixed border-t border-b z-0 border-swan",
					isGaragePage ? "border-l" : "border-l-2"
				)}
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
						<Image
							src="/HAFTR logo.png"
							alt="HAFTR Logo"
							width={300}
							height={300}
							className="max-w-full max-h-full object-contain"
							priority
						/>
					</div>
				</div>
			</div>

			{/* Bottom section with driving controls - lower z-index */}
			{isGaragePage && (
				<div
					className="fixed border-l border-t z-0 border-swan"
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
		</div>
	)
}

export default observer(Workbench)
