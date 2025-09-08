"use client"

import { useState, useEffect } from "react"
import { CqChallengeData } from "@bluedotrobots/common-ts"
import { TactileButton } from "../shadcn/ui/tactile-button"
import { CustomLightbulb } from "../icons/custom-lightbulb"
import requestCareerQuestHint from "../../utils/chat/request-cq-hint"

function HintButton({ cqChallengeData }: { cqChallengeData: CqChallengeData}): React.ReactNode {
	const [isVisible, setIsVisible] = useState(false)

	// Fade in after 1 second
	useEffect((): () => void => {
		const timer = setTimeout((): void => {
			setIsVisible(true)
		}, 1000)

		return (): void => clearTimeout(timer)
	}, [])

	return (
		<div
			className={`mt-2 transition-opacity duration-300 ${
				isVisible ? "opacity-100" : "opacity-0"
			}`}
		>
			<TactileButton
				shadowColor="rgb(140, 80, 200)"
				shadowHeight={4}
				onClick={(): Promise<void> => requestCareerQuestHint(cqChallengeData)}
				size="sm"
				className="bg-beetle-2 text-white rounded-xl font-semibold gap-2"
			>
				<CustomLightbulb className="w-4 h-4" />
				GET A HINT
			</TactileButton>
		</div>
	)
}

export default HintButton
