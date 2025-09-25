"use client"

import { CustomChrome } from "../../icons/custom-chrome"
import { CustomEdge } from "../../icons/custom-edge"
import { CustomFirefox } from "../../icons/custom-firefox"
import { CustomSafari } from "../../icons/custom-safari"
import CustomTooltip from "../custom-tooltip"

export default function BrowserCompatibility(): React.ReactNode {
	return (
		<div className="mt-4 pt-4 border-t border-swan">
			<div className="text-sm text-wolf opacity-75 mb-2">USB Browser Compatibility</div>
			<div className="flex items-center gap-4">
				{/* Supported Browsers */}
				<div className="flex items-center gap-2">
					<div className="text-sm text-chargingGreen font-medium">Supported:</div>
					<div className="flex items-center gap-1">
						<CustomTooltip
							tooltipTrigger={<CustomChrome size={16} />}
							tooltipContent="Google Chrome"
						/>
						<CustomTooltip
							tooltipTrigger={<CustomEdge size={16} />}
							tooltipContent="Microsoft Edge"
						/>
					</div>
				</div>

				{/* Unsupported Browsers */}
				<div className="flex items-center gap-2">
					<div className="text-sm text-cardinal font-medium">Not supported:</div>
					<div className="flex items-center gap-1">
						<CustomTooltip
							tooltipTrigger={<CustomSafari size={16} />}
							tooltipContent="Safari"
						/>
						<CustomTooltip
							tooltipTrigger={<CustomFirefox size={16} />}
							tooltipContent="Mozilla Firefox"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

