
"use client"
import RightContent from "./right-content"
import { cn } from "../../../lib/shadcn/utils"
import TransitionOverlay from "../transition/transition-overlay"
import LeftContentSwiper from "./left-content-swiper"

export default function CareerLayout({ careerData }: { careerData: CareerQuestData }) {
	return (
		<div className="flex h-full">
			{/* Left Panel - Main Swiper */}
			<div className="relative" style={{ width: "45%" }}>
				<div className="px-[100px] py-8 h-full pointer-events-none">
					<div className="h-full pointer-events-auto">
						<LeftContentSwiper careerData={careerData} />
					</div>
				</div>
			</div>

			{/* Right Panel - Unchanged */}
			<div
				className="sticky top-0 h-[calc(100vh-10rem)]"
				style={{ width: "55%" }}
			>
				<div
					className={cn(
						"flex items-center justify-center h-full",
						"border-2 border-swan rounded-3xl bg-polar my-8"
					)}
					style={{ marginRight: "100px" }}
				>
					<RightContent careerData={careerData} />
				</div>
			</div>

			{/* Transition Overlay */}
			<TransitionOverlay careerData={careerData} />
		</div>
	)
}
