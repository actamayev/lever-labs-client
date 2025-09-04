"use client"

import { observer } from "mobx-react"
import { Input } from "../../shadcn/ui/input"
import { cn } from "../../../lib/shadcn/utils"
import editName from "../../../utils/personal-info/edit-name"
import RenderDisplay from "../../garage/display/render-display"
import personalInfoClass from "../../../classes/personal-info-class"
import careerQuestTriggersClass from "../../../classes/career-quest-triggers-class"
import Image from "next/image"

function MeetPipS3P4Display(): React.ReactNode {
	const profanityWords: string[] = [
		"fuck", "shit", "damn", "ass", "bitch", "bastard", "crap",
		"piss", "cock", "dick", "pussy", "whore", "slut", "fag", "nigger",
		"retard", "gay", "stupid", "idiot", "moron", "dumb"
	]

	const containsProfanity = (newText: string, currentText: string): boolean => {
		const lowerNewText = newText.toLowerCase()

		// If text is being shortened (backspace/delete), always allow it
		if (newText.length < currentText.length) {
			return false
		}

		// Check if the new text contains a complete profanity word
		return profanityWords.some((word: string): boolean => {
			return lowerNewText.includes(word)
		})
	}

	const setTextInput = async (text: string): Promise<void> => {
		const currentText = personalInfoClass.name || ""
		if (containsProfanity(text, currentText)) return
		await careerQuestTriggersClass.setTextInput(text)
		void editName(text)
	}

	return (
		<div className="space-y-8">
			<Image
				src="/images/career-quest/meet-pip/s3_p4.png"
				alt="Meet Pip robot introduction"
				width={600}
				height={600}
				className="object-contain rounded-3xl"
				priority
			/>
			{/* Display */}
			<div className="flex justify-center">
				<RenderDisplay pixelBuffer={careerQuestTriggersClass.pixelBuffer} />
			</div>

			{/* Text input */}
			<div className="flex justify-center">
				<Input
					placeholder="Enter text..."
					value={personalInfoClass.name || ""}
					onChange={(e): Promise<void> => setTextInput(e.target.value)}
					className={cn(
						"border-2 pr-6 border-swan rounded-2xl !text-xl text-center bg-inherit shadow-none",
						"[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
						"[&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 font-medium"
					)}
					style={{ height: "60px", width: "300px" }}
				/>
			</div>
		</div>
	)
}

export default observer(MeetPipS3P4Display)
