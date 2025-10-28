"use client"

import Image from "next/image"
import { observer } from "mobx-react"
import { Input } from "../../../ui/input"
import { cn } from "../../../../lib/utils"
import editName from "../../../../utils/personal-info/edit-name"
import RenderDisplay from "../../../garage/display/render-display"
import { filterProfanity } from "../../../../utils/profanity-filter"
import personalInfoClass from "../../../../classes/personal-info-class"
import careerQuestTriggersClass from "../../../../classes/career-quest-triggers-class"

function MeetPipS3P4Display(): React.ReactNode {
	const setTextInput = async (text: string): Promise<void> => {
		const currentText = personalInfoClass.name || ""
		await filterProfanity(text, currentText, async (cleanText: string): Promise<void> => {
			await careerQuestTriggersClass.setTextInput(cleanText)
			void editName(cleanText)
		})
	}

	return (
		<div className="space-y-8">
			<Image
				src="/images/career-quest/meet-pip/s3_p4.png"
				alt="Meet Pip robot introduction"
				width={600}
				height={400}
				className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] h-auto rounded-3xl object-contain mx-auto"
				sizes="(max-width: 768px) 90vw,
         (max-width: 1200px) 50vw,
         40vw"
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
						"border-2 pr-6 border-swan rounded-2xl text-xl! text-center bg-inherit shadow-none",
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
