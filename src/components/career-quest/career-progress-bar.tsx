"use client"

import { observer } from "mobx-react"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider
} from "@/components/shadcn/ui/tooltip"

function CareerProgressBar() {
	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>
					<div className="w-full h-4 bg-swan rounded-full dark:bg-gray-700 overflow-hidden">
						<div
							className="relative h-full rounded-full transition-all duration-300 ease-out bg-green-500"
							style={{
								width: "50%",
							}}
						>
							<div
								className="absolute top-1 left-2 right-2 rounded-full"
								style={{
									background: "rgb(45, 205, 94)",
									height: "3px"
								}}
							/>
						</div>
					</div>
				</TooltipTrigger>
				<TooltipContent side="bottom" className="text-gray-100 dark:text-gray-900 mt-2">
					50% complete
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default observer(CareerProgressBar)
