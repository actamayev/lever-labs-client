"use client"

import { useState, useEffect, useCallback } from "react"
import { TactileButton } from "../shadcn/ui/tactile-button"
import { CustomLightbulb } from "../icons/custom-lightbulb"

interface HintButtonProps {
	challengeId: string
	cppCode: string
	onHintRequest: (challengeId: string, cppCode: string) => Promise<void>
}

function HintButton({ challengeId, cppCode, onHintRequest }: HintButtonProps) {
	const [isVisible, setIsVisible] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	// Fade in after 1 second
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true)
		}, 1000)

		return () => clearTimeout(timer)
	}, [])

	const handleHintClick = useCallback(async () => {
		if (isLoading) return

		setIsLoading(true)
		try {
			await onHintRequest(challengeId, cppCode)
		} finally {
			setIsLoading(false)
		}
	}, [challengeId, cppCode, onHintRequest, isLoading])

	return (
		<div
			className={`mt-2 transition-opacity duration-300 ${
				isVisible ? "opacity-100" : "opacity-0"
			}`}
		>
			<TactileButton
				shadowColor="rgb(140, 80, 200)"
				shadowHeight={4}
				onClick={handleHintClick}
				disabled={isLoading}
				size="sm"
				className="bg-beetle-2 text-white rounded-xl font-semibold gap-2"
			>
				<CustomLightbulb className="w-4 h-4" />
				{isLoading ? "Getting hint..." : "GET A HINT"}
			</TactileButton>
		</div>
	)
}

export default HintButton
