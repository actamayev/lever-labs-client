"use client"

import { observer } from "mobx-react"
import CustomTooltip from "../../../custom-tooltip"
import labReadingClass from "../../../../classes/lab-reading-class"

function ReadingProgressBar() {

	return (
		<CustomTooltip
			tooltipTrigger={
				<div className="w-full h-4 bg-swan rounded-full overflow-hidden">
					<div
						className="relative h-full rounded-full duration-0 ease-out bg-green-500"
						style={{
							width: `${labReadingClass.readingProgressPercentage}%`,
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
			}
			contentSide="bottom"
			tooltipContent={
				<>
					{Math.round(labReadingClass.readingProgressPercentage)}% complete
				</>
			}
		/>
	)
}

export default observer(ReadingProgressBar)
