"use client"

import { useEffect } from "react"
import labReadingClass from "../../classes/lab-reading-class"

export default function useAnswerChoiceButtonListener(): void {
	// Add keyboard event listener
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent): void => {
			const numKey = parseInt(event.key)
			if (numKey >= 1 && numKey <= 4) {
				labReadingClass.setDraftAnswerChoice(numKey as AnswerChoiceID)
			}

			//if the user presses enter, submit the answer
			if (event.key === "Enter") labReadingClass.checkAnswer()
		}

		window.addEventListener("keydown", handleKeyPress)
		return (): void => window.removeEventListener("keydown", handleKeyPress)
	}, [])
}
