"use client"

import { useState } from "react"
import { CqChallengeData } from "@bluedotrobots/common-ts"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import { ChevronDown, RotateCcw, X } from "lucide-react"

interface ChallengeHeaderProps {
	challengeData: CqChallengeData
}

function ChallengeHeader({ challengeData }: ChallengeHeaderProps) {
	const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(true)

	if (!isDescriptionExpanded) {
		return (
			<div className="">
				<div className="p-3">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold text-foreground">
							{challengeData.title}
						</h3>
						<TactileButton
							className="bg-beakInner text-white flex items-center justify-center rounded-lg p-2 h-8 w-8"
							shadowClass="shadow-beakInner-2"
							onClick={() => setIsDescriptionExpanded(true)}
						>
							<ChevronDown className="w-4 h-4" />
						</TactileButton>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="">
			<div className="px-3 pt-3">
				<div className="flex gap-4">
					{/* First column - Title and Description (45%) */}
					<div className="w-[45%]">
						<h3 className="text-xl font-semibold mb-3 text-foreground">
							{challengeData.title}
						</h3>
						<p className="text-sm text-muted-foreground leading-relaxed">
							{challengeData.description}
						</p>
					</div>

					{/* Second column - Before Running Text (45%) */}
					<div className="w-[45%]">
						{challengeData.beforeRunningText && (
							<>
								<h4 className="text-lg font-medium mb-2 text-foreground">
									Before Running
								</h4>
								<p className="text-sm text-muted-foreground leading-relaxed">
									{challengeData.beforeRunningText}
								</p>
							</>
						)}
					</div>

					{/* Third column - Action Buttons (10%) */}
					<div className="w-[10%] flex flex-col gap-2">
						<TactileButton
							className="bg-beakInner text-white flex items-center justify-center rounded-lg p-2 h-10"
							shadowClass="shadow-beakInner-2"
							onClick={() => setIsDescriptionExpanded(false)}
						>
							<X className="w-4 h-4" />
						</TactileButton>
						<TactileButton
							className="bg-bee text-white flex items-center justify-center rounded-lg p-2 h-10"
							shadowClass="shadow-bee-2"
							onClick={() => {
								// TODO: Implement reset functionality
							}}
						>
							<RotateCcw className="w-4 h-4" />
						</TactileButton>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChallengeHeader
