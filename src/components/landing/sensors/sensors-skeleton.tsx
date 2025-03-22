"use client"

import { cn } from "../../../lib/shadcn/utils"
import { landingSensorCardHeaderText, landingSensorCardText } from "../../../utils/text-styles"

interface Props {
	title: React.ReactNode
	description: string
	icon: React.ReactNode
	outerDivStyles: string
}

export default function SensorsSkeleton(props: Props) {
	const { title, description, icon: Icon, outerDivStyles } = props

	return (
		<div
			className={cn(
				"group relative flex flex-col justify-between overflow-hidden rounded-xl",
				"bg-standardBackground [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
				"transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)]",
				"dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
				outerDivStyles
			)}
		>
			{/* Container changes from vertical on mobile to horizontal on md+ */}
			<div className="z-10 flex flex-row transform-gpu gap-2 sm:gap-3 md:gap-4 p-3 sm:p-3 md:p-4 h-full">
				{/* Icon container */}
				<div className="shrink-0 flex justify-center items-center">
					{Icon}
				</div>
				{/* Text container */}
				<div className="flex flex-col justify-center flex-1">
					<h3 className={landingSensorCardHeaderText()}>
						{title}
					</h3>
					<p className={landingSensorCardText()}>
						{description}
					</p>
				</div>
			</div>
		</div>
	)
}
